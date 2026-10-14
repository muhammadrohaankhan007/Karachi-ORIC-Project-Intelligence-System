/**
 * Optional AI Integration Layer
 * Provides an interface for enhanced abstract reasoning, industry synthesis, and validation queries.
 * Supports Google Gemini API, OpenAI-compatible endpoints, or secure custom backend proxies.
 * Never leaks keys; stores credentials strictly in browser session memory or secure localStorage.
 * Seamlessly falls back to local heuristic intelligence if AI is disabled or offline.
 */

class AIIntegration {
  constructor() {
    this.storageKey = "karachi_ai_settings_v1";
    this.settings = this.loadSettings();
  }

  loadSettings() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {
        enabled: false,
        provider: "gemini", // "gemini" or "openai" or "proxy"
        apiKey: "",
        model: "gemini-1.5-flash",
        proxyUrl: ""
      };
    } catch (e) {
      return { enabled: false, provider: "gemini", apiKey: "", model: "gemini-1.5-flash", proxyUrl: "" };
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    } catch (e) {
      console.warn("Could not save AI settings:", e);
    }
  }

  isEnabled() {
    return !!(this.settings.enabled && (this.settings.apiKey || this.settings.proxyUrl));
  }

  /**
   * Test connection to the configured AI API
   */
  async testConnection() {
    if (!this.settings.apiKey && !this.settings.proxyUrl) {
      throw new Error("No API key or Proxy endpoint provided. Please enter an API key.");
    }

    const testPrompt = "Provide a 1-sentence confirmation that the Karachi Industry Intelligence AI engine is online.";

    if (this.settings.provider === "gemini") {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.settings.model || "gemini-1.5-flash"}:generateContent?key=${this.settings.apiKey}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: testPrompt }] }]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP error ${response.status}`);
      }

      const resData = await response.json();
      return resData.candidates?.[0]?.content?.parts?.[0]?.text || "Connected successfully to Google Gemini.";
    } else if (this.settings.provider === "openai") {
      const endpoint = "https://api.openai.com/v1/chat/completions";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.settings.apiKey}`
        },
        body: JSON.stringify({
          model: this.settings.model || "gpt-4o-mini",
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 50
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP error ${response.status}`);
      }

      const resData = await response.json();
      return resData.choices?.[0]?.message?.content || "Connected successfully to OpenAI.";
    } else {
      // Custom backend proxy
      const response = await fetch(this.settings.proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: testPrompt })
      });
      if (!response.ok) throw new Error(`Proxy error ${response.status}`);
      return "Connected successfully to custom backend proxy.";
    }
  }

  /**
   * AI-Enhanced Deep Abstract Synthesis
   * Enhances project analysis with contextual Karachi industrial recommendations
   */
  async synthesizeProject(project, baselineIntelligence) {
    if (!this.isEnabled()) {
      return null;
    }

    const systemPrompt = `You are the Chief Industrial Commercialization Officer at ORIC in Karachi, Pakistan.
Analyze this university project title and abstract for industrial and commercialization relevance in Karachi:

Title: "${project.title}"
Abstract: "${project.abstract}"
Discipline: "${baselineIntelligence.specialization}"
Matched Karachi Industry: "${baselineIntelligence.industryMatch}"

Return ONLY a valid JSON object matching this schema:
{
  "industryProblemAddressed": "1-2 sentences on specific operational problems in Karachi",
  "targetKarachiCustomer": "Specific company or persona in Karachi",
  "recommendedPilotPartner": "2-3 real Karachi companies (e.g. in SITE, Korangi, or Port Qasim)",
  "ipStrategy": "Specific patent or trade secret advice under IPO-Pakistan",
  "keyRegulatoryChallenge": "Compliance requirement (DRAP, SBP, SEPA, etc.)",
  "30DayAction": "Specific 30-day next step"
}`;

    try {
      let rawText = "";

      if (this.settings.provider === "gemini") {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.settings.model || "gemini-1.5-flash"}:generateContent?key=${this.settings.apiKey}`;
        const resp = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (!resp.ok) throw new Error(`Gemini API error: ${resp.status}`);
        const data = await resp.json();
        rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      } else if (this.settings.provider === "openai") {
        const endpoint = "https://api.openai.com/v1/chat/completions";
        const resp = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.settings.apiKey}`
          },
          body: JSON.stringify({
            model: this.settings.model || "gpt-4o-mini",
            messages: [{ role: "user", content: systemPrompt }],
            response_format: { type: "json_object" }
          })
        });
        if (!resp.ok) throw new Error(`OpenAI API error: ${resp.status}`);
        const data = await resp.json();
        rawText = data.choices?.[0]?.message?.content || "{}";
      }

      const parsed = JSON.parse(rawText);
      return parsed;
    } catch (err) {
      console.warn("AI synthesis encountered an issue, defaulting to heuristic analysis:", err);
      return null;
    }
  }
}

if (typeof window !== "undefined") {
  window.AIIntegration = AIIntegration;
}
