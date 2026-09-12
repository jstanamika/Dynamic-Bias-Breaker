// Dynamic Bias-Breaker — vanilla JS port
// Ports the behavior of App.tsx + Header/ResearchSandbox/TelemetryPanel/
// BiasGauge/DevilsAdvocate/SessionHistory into plain DOM manipulation.
// Relies on engine.js (loaded first) for PRESETS, TOPICS, ANALYSIS_STEPS,
// analyzeText, estimateBias, dietFromBias, riskFromBias.

(function () {
  "use strict";

  // ---------------- state ----------------
  const state = {
    query: "",
    analyzing: false,
    step: 0,
    result: null,
    history: [],
    error: "",
    activePreset: null,
  };

  let timers = [];

  function clearTimers() {
    timers.forEach((id) => window.clearTimeout(id));
    timers = [];
  }

  // ---------------- element refs ----------------
  const el = {
    progressBar: document.getElementById("progress-bar"),
    clockStamp: document.getElementById("clock-stamp"),
    sessionCountLabel: document.getElementById("session-count-label"),
    stageDots: Array.from(document.querySelectorAll(".stage-dot")),
    statusPill: document.getElementById("status-pill"),
    statusText: document.getElementById("status-text"),

    queryInput: document.getElementById("query-input"),
    textareaWrap: document.getElementById("textarea-wrap"),
    scanBeam: document.getElementById("scan-beam"),
    charWordCount: document.getElementById("char-word-count"),
    errorMessage: document.getElementById("error-message"),
    presetList: document.getElementById("preset-list"),
    analyzeBtn: document.getElementById("analyze-btn"),
    analyzeBtnLabel: document.getElementById("analyze-btn-label"),
    clearBtn: document.getElementById("clear-btn"),

    riskChip: document.getElementById("risk-chip"),
    gaugeRing: document.getElementById("gauge-ring"),
    gaugeCaption: document.getElementById("gauge-caption"),
    gaugeNumber: document.getElementById("gauge-number"),
    gaugeStatus: document.getElementById("gauge-status"),
    stepsPanel: document.getElementById("steps-panel"),
    resultStanceCard: document.getElementById("result-stance-card"),
    stanceTitle: document.getElementById("stance-title"),
    stanceDetail: document.getElementById("stance-detail"),
    stanceSideTag: document.getElementById("stance-side-tag"),
    stanceTopicTag: document.getElementById("stance-topic-tag"),
    stanceConfTag: document.getElementById("stance-conf-tag"),
    awaitingPanel: document.getElementById("awaiting-panel"),
    clustersList: document.getElementById("clusters-list"),
    signalsGrid: document.getElementById("signals-grid"),
    keywordsRow: document.getElementById("keywords-row"),

    alertBanner: document.getElementById("alert-banner"),

    devilsAdvocate: document.getElementById("devils-advocate"),
    devilsAccent: document.getElementById("devils-accent"),
    devilsTitle: document.getElementById("devils-title"),
    flipBtn: document.getElementById("flip-btn"),
    devilsIdle: document.getElementById("devils-idle"),
    devilsFront: document.getElementById("devils-front"),
    devilsBack: document.getElementById("devils-back"),
    blindspotText: document.getElementById("blindspot-text"),
    missingList: document.getElementById("missing-list"),
    counterargText: document.getElementById("counterarg-text"),
    counterdataGrid: document.getElementById("counterdata-grid"),
    opposingText: document.getElementById("opposing-text"),
    originalText: document.getElementById("original-text"),

    resetSessionBtn: document.getElementById("reset-session-btn"),
    statCount: document.getElementById("stat-count"),
    statAvg: document.getElementById("stat-avg"),
    statHealth: document.getElementById("stat-health"),
    statTexture: document.getElementById("stat-texture"),
    balanceMix: document.getElementById("balance-mix"),
    balanceMixLabel: document.getElementById("balance-mix-label"),
    balanceBarGood: document.getElementById("balance-bar-good"),
    balanceBarBad: document.getElementById("balance-bar-bad"),
    historyEmpty: document.getElementById("history-empty"),
    historyList: document.getElementById("history-list"),
  };

  let flipped = false;

  // ---------------- Header: clock ----------------
  function pad(n) {
    return n.toString().padStart(2, "0");
  }

  function tickClock() {
    const now = new Date();
    el.clockStamp.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  tickClock();
  window.setInterval(tickClock, 1000);

  function renderHeader() {
    el.sessionCountLabel.textContent = `N=${state.history.length}`;

    el.stageDots.forEach((dot) => {
      const stage = Number(dot.dataset.stage);
      dot.classList.remove("active-ingest", "active-cluster", "active-interrupt");
      if (state.analyzing) {
        if (stage === 0) dot.classList.add("active-ingest");
        else if (stage === 1) dot.classList.add("active-cluster");
        else dot.classList.add("active-interrupt");
      }
    });

    if (state.analyzing) {
      el.statusPill.classList.add("status-analyzing");
      el.statusText.textContent = "Middleware scanning corpus…";
    } else {
      el.statusPill.classList.remove("status-analyzing");
      el.statusText.textContent = "Middleware Active: Protecting against confirmation bias";
    }

    el.progressBar.classList.toggle("hidden", !state.analyzing);
  }

  // ---------------- Bias gauge ----------------
  const GAUGE_SIZE = 168;
  const GAUGE_STROKE = 12;
  const GAUGE_R = (GAUGE_SIZE - GAUGE_STROKE) / 2;
  const GAUGE_C = 2 * Math.PI * GAUGE_R;
  el.gaugeRing.setAttribute("stroke-dasharray", String(GAUGE_C));

  function colorForBias(v) {
    if (v < 35) return { stroke: "#34d399", label: "Neutral / Calibrated", glow: "rgba(52,211,153,0.35)" };
    if (v < 55) return { stroke: "#fbbf24", label: "Leaning", glow: "rgba(251,191,36,0.35)" };
    if (v < 75) return { stroke: "#fb923c", label: "High Echo Risk", glow: "rgba(251,146,60,0.4)" };
    return { stroke: "#fb7185", label: "Critical Echo Chamber", glow: "rgba(251,113,133,0.45)" };
  }

  function renderGauge(value, live) {
    const clamped = Math.max(0, Math.min(100, value));
    const offset = GAUGE_C * (1 - clamped / 100);
    const meta = colorForBias(clamped);

    el.gaugeRing.setAttribute("stroke-dashoffset", String(offset));
    el.gaugeRing.setAttribute("stroke", meta.stroke);
    el.gaugeRing.style.filter = `drop-shadow(0 0 8px ${meta.glow})`;

    el.gaugeCaption.textContent = live ? "draft signal" : "CBI";
    el.gaugeNumber.textContent = String(Math.round(clamped));

    el.gaugeStatus.textContent = clamped < 12 && !live ? "Awaiting corpus" : meta.label;
    el.gaugeStatus.style.color = meta.stroke;
  }

  // ---------------- Research sandbox ----------------
  function renderPresets() {
    el.presetList.innerHTML = "";
    PRESETS.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "preset-btn" + (state.activePreset === p.id ? " active" : "");
      btn.textContent = p.label;
      btn.addEventListener("click", () => onPreset(p.id, p.text));
      el.presetList.appendChild(btn);
    });
  }

  function renderSandbox() {
    const trimmed = state.query.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    el.charWordCount.textContent = `${state.query.length} chars · ${words} words`;

    el.textareaWrap.classList.toggle("has-error", Boolean(state.error));
    el.scanBeam.classList.toggle("hidden", !state.analyzing);

    if (state.error) {
      el.errorMessage.textContent = state.error;
      el.errorMessage.classList.remove("hidden");
    } else {
      el.errorMessage.classList.add("hidden");
    }

    renderPresets();

    el.analyzeBtn.disabled = state.analyzing;
    if (state.analyzing) {
      el.analyzeBtnLabel.textContent = "Analyzing stance…";
      el.analyzeBtn.querySelector("svg").classList.add("hidden");
      let spinner = el.analyzeBtn.querySelector(".spinner");
      if (!spinner) {
        spinner = document.createElement("span");
        spinner.className = "spinner";
        el.analyzeBtn.insertBefore(spinner, el.analyzeBtnLabel);
      }
    } else {
      el.analyzeBtnLabel.textContent = "Analyze Stance";
      el.analyzeBtn.querySelector("svg").classList.remove("hidden");
      const spinner = el.analyzeBtn.querySelector(".spinner");
      if (spinner) spinner.remove();
    }
  }

  function shakeTextarea() {
    el.textareaWrap.classList.remove("shake");
    // force reflow so the animation can restart
    void el.textareaWrap.offsetWidth;
    el.textareaWrap.classList.add("shake");
    window.setTimeout(() => el.textareaWrap.classList.remove("shake"), 450);
  }

  function fail(message) {
    state.error = message;
    shakeTextarea();
    render();
  }

  function onPreset(id, text) {
    state.activePreset = id;
    state.query = text;
    state.error = "";
    state.result = null;
    el.queryInput.value = text;
    render();
  }

  function onClear() {
    state.query = "";
    state.activePreset = null;
    state.error = "";
    state.result = null;
    el.queryInput.value = "";
    render();
  }

  function onAnalyze() {
    const trimmed = state.query.trim();
    if (!trimmed) {
      fail("Intake empty. Paste a claim or load a preset before running stance analysis.");
      return;
    }
    if (trimmed.split(/\s+/).length < 8) {
      fail("Signal too thin. Provide at least a short paragraph (8+ words) so clustering can run.");
      return;
    }

    clearTimers();
    state.error = "";
    state.analyzing = true;
    state.step = 0;
    state.result = null;
    render();

    ANALYSIS_STEPS.forEach((_, i) => {
      const id = window.setTimeout(() => {
        state.step = i;
        render();
      }, 380 * i);
      timers.push(id);
    });

    const done = window.setTimeout(() => {
      const next = analyzeText(trimmed);
      state.result = next;
      state.analyzing = false;
      state.step = ANALYSIS_STEPS.length - 1;

      const item = {
        id: `${Date.now()}`,
        query: trimmed.length > 96 ? `${trimmed.slice(0, 96)}…` : trimmed,
        topicLabel: next.topicLabel,
        timestamp: Date.now(),
        biasIndex: next.biasIndex,
        diet: dietFromBias(next.biasIndex),
        stance: next.stance,
      };
      state.history = [item, ...state.history].slice(0, 8);
      flipped = false;
      render();
    }, 2280);
    timers.push(done);
  }

  // ---------------- Telemetry panel ----------------
  function riskClass(level) {
    return {
      low: "risk-low",
      moderate: "risk-moderate",
      high: "risk-high",
      critical: "risk-critical",
    }[level];
  }

  function renderTelemetry() {
    const hasQuery = state.query.trim().length > 0;
    const liveBias = estimateBias(state.query);
    const display = state.analyzing
      ? Math.max(liveBias, 8)
      : state.result
        ? state.result.biasIndex
        : hasQuery
          ? liveBias
          : 0;

    renderGauge(display, !state.result || state.analyzing);

    if (state.result && !state.analyzing) {
      el.riskChip.classList.remove("hidden");
      el.riskChip.className = "risk-chip " + riskClass(state.result.riskLevel);
      el.riskChip.textContent = `${state.result.riskLevel} risk`;
    } else {
      el.riskChip.classList.add("hidden");
    }

    // steps / stance card / awaiting
    if (state.analyzing) {
      el.stepsPanel.classList.remove("hidden");
      el.resultStanceCard.classList.add("hidden");
      el.awaitingPanel.classList.add("hidden");

      el.stepsPanel.innerHTML = "";
      ANALYSIS_STEPS.forEach((s, i) => {
        const row = document.createElement("div");
        row.className = "step-row" + (i <= state.step ? (i < state.step ? " step-done" : " step-active") : "");
        const marker = document.createElement("span");
        marker.className = "step-marker";
        marker.textContent = i < state.step ? "✓" : i === state.step ? ">" : "·";
        const label = document.createElement("span");
        label.textContent = s;
        row.appendChild(marker);
        row.appendChild(label);
        el.stepsPanel.appendChild(row);
      });
    } else if (state.result) {
      el.stepsPanel.classList.add("hidden");
      el.awaitingPanel.classList.add("hidden");
      el.resultStanceCard.classList.remove("hidden");

      el.stanceTitle.textContent = state.result.stance;
      el.stanceDetail.textContent = state.result.stanceDetail;
      el.stanceSideTag.textContent = `Side · ${state.result.detectedSide}`;
      el.stanceTopicTag.textContent = `Topic · ${state.result.topicLabel}`;
      el.stanceConfTag.textContent = `Conf ${state.result.confidence}%`;
    } else {
      el.stepsPanel.classList.add("hidden");
      el.resultStanceCard.classList.add("hidden");
      el.awaitingPanel.classList.remove("hidden");
    }

    // clusters
    const clusters =
      state.result && !state.analyzing
        ? state.result.clusters
        : [
            { label: "In-group framing", weight: hasQuery ? Math.min(liveBias, 70) : 6 },
            { label: "Counter-evidence density", weight: hasQuery ? Math.max(8, 80 - liveBias) : 4 },
            { label: "Causal complexity", weight: hasQuery ? 18 : 5 },
            { label: "Epistemic humility", weight: hasQuery ? Math.max(5, 90 - liveBias) : 7 },
          ];

    el.clustersList.innerHTML = "";
    clusters.forEach((c, i) => {
      const row = document.createElement("div");
      row.className = "cluster-row";

      const labels = document.createElement("div");
      labels.className = "cluster-row-labels";
      const labelSpan = document.createElement("span");
      labelSpan.textContent = c.label;
      const weightSpan = document.createElement("span");
      weightSpan.textContent = `${Math.round(c.weight)}%`;
      labels.appendChild(labelSpan);
      labels.appendChild(weightSpan);

      const track = document.createElement("div");
      track.className = "cluster-bar-track";
      const fill = document.createElement("div");
      fill.className = "cluster-bar-fill";
      fill.style.width = `${c.weight}%`;
      fill.style.background =
        i === 1 || i === 3 ? "linear-gradient(90deg,#34d399,#22d3ee)" : "linear-gradient(90deg,#fb7185,#a78bfa)";
      fill.style.animationDelay = `${i * 80}ms`;
      track.appendChild(fill);

      row.appendChild(labels);
      row.appendChild(track);
      el.clustersList.appendChild(row);
    });

    // signals
    if (state.result && !state.analyzing) {
      el.signalsGrid.classList.remove("hidden");
      el.signalsGrid.innerHTML = "";
      state.result.signals.forEach((s) => {
        const card = document.createElement("div");
        card.className = "signal-card";
        card.innerHTML = `
          <p class="signal-label">${escapeHtml(s.label)}</p>
          <p class="signal-value">${escapeHtml(String(s.value))}</p>
          <p class="signal-hint">${escapeHtml(s.hint)}</p>
        `;
        el.signalsGrid.appendChild(card);
      });
    } else {
      el.signalsGrid.classList.add("hidden");
    }

    // keywords
    if (state.result && !state.analyzing) {
      el.keywordsRow.classList.remove("hidden");
      el.keywordsRow.innerHTML = "";
      state.result.keywords.forEach((k) => {
        const tag = document.createElement("span");
        tag.className = "keyword-tag";
        tag.textContent = `#${k}`;
        el.keywordsRow.appendChild(tag);
      });
    } else {
      el.keywordsRow.classList.add("hidden");
    }
  }

  // ---------------- Alert banner ----------------
  function renderAlert() {
    if (state.result && !state.analyzing) {
      el.alertBanner.classList.remove("hidden");
      const high = state.result.biasIndex >= 45;
      el.alertBanner.className = "alert-banner " + (high ? "alert-warn" : "alert-ok");
      if (high) {
        el.alertBanner.innerHTML = `<strong>Cognitive interrupt fired.</strong>One-sided clustering exceeded the safety threshold (${state.result.biasIndex}% CBI). Review the devil's-advocate card before continuing the research loop.`;
      } else {
        el.alertBanner.innerHTML = `<strong>Stance appears calibrated.</strong>Echo-chamber risk is ${state.result.biasIndex}%. The interrupter still offers a steelman of the opposing view — use it as a pre-mortem.`;
      }
    } else {
      el.alertBanner.classList.add("hidden");
    }
  }

  // ---------------- Devil's advocate ----------------
  function renderDevilsAdvocate() {
    const armed = Boolean(state.result) && !state.analyzing;
    const high = (state.result ? state.result.biasIndex : 0) >= 45;

    el.devilsAccent.className = "devils-accent " + (!armed ? "devils-accent-idle" : high ? "devils-accent-high" : "devils-accent-ok");

    if (!armed) {
      el.devilsTitle.textContent = "Interrupter idle";
    } else if (high) {
      el.devilsTitle.textContent = "Interrupter armed — echo chamber texture detected";
    } else {
      el.devilsTitle.textContent = "Calibration check — stance appears reasonably mixed";
    }

    el.flipBtn.disabled = !armed;
    el.flipBtn.textContent = flipped ? "Show Blind Spots" : "Toggle Counter-Perspective";

    if (!armed) {
      el.devilsIdle.classList.remove("hidden");
      el.devilsFront.classList.add("hidden");
      el.devilsBack.classList.add("hidden");
      return;
    }
    el.devilsIdle.classList.add("hidden");

    const r = state.result;

    if (!flipped) {
      el.devilsFront.classList.remove("hidden");
      el.devilsBack.classList.add("hidden");

      el.blindspotText.textContent = r.blindSpot;
      el.missingList.innerHTML = "";
      r.missingPerspectives.forEach((m) => {
        const li = document.createElement("li");
        li.textContent = m;
        el.missingList.appendChild(li);
      });

      el.counterargText.textContent = r.counterArgument;

      el.counterdataGrid.innerHTML = "";
      r.counterData.forEach((d) => {
        const card = document.createElement("div");
        card.className = "counterdata-card";
        card.innerHTML = `
          <p class="counterdata-claim">${escapeHtml(d.claim)}</p>
          <p class="counterdata-detail">${escapeHtml(d.detail)}</p>
        `;
        el.counterdataGrid.appendChild(card);
      });
    } else {
      el.devilsFront.classList.add("hidden");
      el.devilsBack.classList.remove("hidden");

      el.opposingText.textContent = r.opposingPerspective;
      el.originalText.textContent = r.originalPerspective;
    }
  }

  // ---------------- Session history ----------------
  function dietClass(diet) {
    return {
      Balanced: "diet-balanced",
      Leaning: "diet-leaning",
      "One-Sided": "diet-onesided",
      "Echo Chamber": "diet-echo",
    }[diet];
  }

  function renderHistory() {
    const history = state.history;
    const avg = history.length ? Math.round(history.reduce((s, h) => s + h.biasIndex, 0) / history.length) : 0;
    const balanced = history.filter((h) => h.diet === "Balanced" || h.diet === "Leaning").length;
    const oneSided = history.length - balanced;
    const dietHealth = history.length ? Math.round((balanced / history.length) * 100) : 0;
    const sessionDiet = history.length ? dietFromBias(avg) : "—";

    el.resetSessionBtn.disabled = !history.length;

    el.statCount.textContent = String(history.length);
    el.statAvg.textContent = history.length ? `${avg}%` : "—";
    el.statHealth.textContent = history.length ? `${dietHealth}%` : "—";
    el.statTexture.textContent = String(sessionDiet);

    if (history.length > 0) {
      el.balanceMix.classList.remove("hidden");
      el.balanceMixLabel.textContent = `${balanced} calibrated · ${oneSided} one-sided`;
      el.balanceBarGood.style.width = `${(balanced / history.length) * 100}%`;
      el.balanceBarBad.style.width = `${(oneSided / history.length) * 100}%`;
    } else {
      el.balanceMix.classList.add("hidden");
    }

    if (history.length === 0) {
      el.historyEmpty.classList.remove("hidden");
      el.historyList.classList.add("hidden");
      el.historyList.innerHTML = "";
    } else {
      el.historyEmpty.classList.add("hidden");
      el.historyList.classList.remove("hidden");
      el.historyList.innerHTML = "";
      history.forEach((h) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
          <div class="history-main">
            <p class="history-query">${escapeHtml(h.query)}</p>
            <p class="history-meta">${escapeHtml(h.topicLabel)} · ${escapeHtml(new Date(h.timestamp).toLocaleTimeString())} · ${escapeHtml(h.stance)}</p>
          </div>
          <div class="history-stats">
            <div class="history-bar-track">
              <div class="history-bar-fill" style="width:${h.biasIndex}%"></div>
            </div>
            <span class="history-percent">${h.biasIndex}%</span>
            <span class="diet-chip ${dietClass(h.diet)}">${escapeHtml(h.diet)}</span>
          </div>
        `;
        el.historyList.appendChild(li);
      });
    }
  }

  function onResetHistory() {
    state.history = [];
    render();
  }

  // ---------------- helpers ----------------
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------------- master render ----------------
  function render() {
    renderHeader();
    renderSandbox();
    renderTelemetry();
    renderAlert();
    renderDevilsAdvocate();
    renderHistory();
  }

  // ---------------- wire up events ----------------
  el.queryInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    state.activePreset = null;
    state.error = "";
    render();
  });

  el.queryInput.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onAnalyze();
    }
  });

  el.analyzeBtn.addEventListener("click", onAnalyze);
  el.clearBtn.addEventListener("click", onClear);
  el.flipBtn.addEventListener("click", () => {
    flipped = !flipped;
    render();
  });
  el.resetSessionBtn.addEventListener("click", onResetHistory);

  window.addEventListener("beforeunload", clearTimers);

  // ---------------- initial paint ----------------
  render();
})();
