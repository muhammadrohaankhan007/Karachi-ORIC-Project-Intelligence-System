/**
 * Chart.js Visualization Manager
 * Controls the 5 dynamic dashboard charts with interactive responsiveness,
 * high-contrast color palettes, elegant tooltips, and auto-updating upon data filtering.
 */

class ChartsManager {
  constructor() {
    this.charts = {
      specCount: null,
      specScore: null,
      potentialTier: null,
      industryDist: null,
      topRanked: null
    };

    // Color theme tailored for academic-industrial intelligence
    this.palette = [
      "#2563eb", "#0d9488", "#16a34a", "#7c3aed", "#ea580c",
      "#0284c7", "#e11d48", "#ca8a04", "#4f46e5", "#059669",
      "#9333ea", "#c026d3", "#d97706", "#2dd4bf", "#f97316"
    ];
  }

  /**
   * Initialize or update all 5 dashboard charts
   */
  updateAllCharts(projects) {
    if (!projects || projects.length === 0) {
      this.destroyAll();
      return;
    }

    this.renderSpecCountChart(projects);
    this.renderSpecScoreChart(projects);
    this.renderPotentialTierChart(projects);
    this.renderIndustryDistChart(projects);
    this.renderTopRankedChart(projects);
  }

  destroyAll() {
    Object.keys(this.charts).forEach(key => {
      if (this.charts[key]) {
        this.charts[key].destroy();
        this.charts[key] = null;
      }
    });
  }

  /**
   * 1. Bar Chart: Project Count by Specialization
   */
  renderSpecCountChart(projects) {
    const ctx = document.getElementById("chartSpecCount");
    if (!ctx) return;

    const specCounts = {};
    projects.forEach(p => {
      const spec = (p.intelligence && p.intelligence.specialization) || "Unclassified";
      specCounts[spec] = (specCounts[spec] || 0) + 1;
    });

    const sortedSpecs = Object.entries(specCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const labels = sortedSpecs.map(s => s[0].length > 25 ? s[0].substring(0, 22) + "..." : s[0]);
    const fullLabels = sortedSpecs.map(s => s[0]);
    const data = sortedSpecs.map(s => s[1]);

    if (this.charts.specCount) {
      this.charts.specCount.destroy();
    }

    this.charts.specCount = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Projects",
          data: data,
          backgroundColor: "#3b82f6",
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => fullLabels[items[0].dataIndex] || items[0].label,
              label: (item) => ` ${item.raw} Projects`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0, font: { family: "Inter, sans-serif" } },
            grid: { color: "rgba(226, 232, 240, 0.6)" }
          },
          x: {
            ticks: {
              font: { size: 11, family: "Inter, sans-serif" },
              maxRotation: 35,
              minRotation: 25
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  /**
   * 2. Bar Chart: Average Market Potential Score by Specialization
   */
  renderSpecScoreChart(projects) {
    const ctx = document.getElementById("chartSpecScore");
    if (!ctx) return;

    const specTotals = {};
    projects.forEach(p => {
      const spec = (p.intelligence && p.intelligence.specialization) || "Unclassified";
      const score = (p.scoreData && p.scoreData.totalScore) || 0;
      if (!specTotals[spec]) {
        specTotals[spec] = { sum: 0, count: 0 };
      }
      specTotals[spec].sum += score;
      specTotals[spec].count += 1;
    });

    const sortedAverages = Object.entries(specTotals)
      .map(([spec, obj]) => ({
        spec,
        avg: Math.round(obj.sum / obj.count),
        count: obj.count
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 8);

    const labels = sortedAverages.map(s => s.spec.length > 25 ? s.spec.substring(0, 22) + "..." : s.spec);
    const fullLabels = sortedAverages.map(s => s.spec);
    const data = sortedAverages.map(s => s.avg);

    if (this.charts.specScore) {
      this.charts.specScore.destroy();
    }

    this.charts.specScore = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Avg Market Score",
          data: data,
          backgroundColor: data.map(val => val >= 80 ? "#10b981" : val >= 65 ? "#0284c7" : val >= 50 ? "#f59e0b" : "#64748b"),
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => fullLabels[items[0].dataIndex] || items[0].label,
              label: (item) => ` Avg Score: ${item.raw}/100 (${sortedAverages[item.dataIndex].count} projects)`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20, font: { family: "Inter, sans-serif" } },
            grid: { color: "rgba(226, 232, 240, 0.6)" }
          },
          x: {
            ticks: {
              font: { size: 11, family: "Inter, sans-serif" },
              maxRotation: 35,
              minRotation: 25
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  /**
   * 3. Doughnut Chart: Projects by Market Potential Tier
   */
  renderPotentialTierChart(projects) {
    const ctx = document.getElementById("chartPotentialTier");
    if (!ctx) return;

    const tiers = {
      "High Potential (80-100)": 0,
      "Promising (65-79)": 0,
      "Development Opportunity (50-64)": 0,
      "Early-Stage (<50)": 0
    };

    projects.forEach(p => {
      const score = (p.scoreData && p.scoreData.totalScore) || 0;
      if (score >= 80) tiers["High Potential (80-100)"]++;
      else if (score >= 65) tiers["Promising (65-79)"]++;
      else if (score >= 50) tiers["Development Opportunity (50-64)"]++;
      else tiers["Early-Stage (<50)"]++;
    });

    if (this.charts.potentialTier) {
      this.charts.potentialTier.destroy();
    }

    this.charts.potentialTier = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(tiers),
        datasets: [{
          data: Object.values(tiers),
          backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#64748b"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 11, family: "Inter, sans-serif" }, boxWidth: 12, padding: 12 }
          },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.label}: ${item.raw} Projects (${Math.round(item.raw / projects.length * 100)}%)`
            }
          }
        },
        cutout: "65%"
      }
    });
  }

  /**
   * 4. Horizontal Bar Chart: Project Distribution Across Karachi Industry Sectors
   */
  renderIndustryDistChart(projects) {
    const ctx = document.getElementById("chartIndustryDist");
    if (!ctx) return;

    const indCounts = {};
    projects.forEach(p => {
      const ind = (p.intelligence && p.intelligence.industryMatch) || "Other";
      indCounts[ind] = (indCounts[ind] || 0) + 1;
    });

    const sortedInds = Object.entries(indCounts).sort((a, b) => b[1] - a[1]).slice(0, 7);
    const labels = sortedInds.map(i => i[0].length > 28 ? i[0].substring(0, 25) + "..." : i[0]);
    const fullLabels = sortedInds.map(i => i[0]);
    const data = sortedInds.map(i => i[1]);

    if (this.charts.industryDist) {
      this.charts.industryDist.destroy();
    }

    this.charts.industryDist = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Projects Matched",
          data: data,
          backgroundColor: "#8b5cf6",
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => fullLabels[items[0].dataIndex] || items[0].label,
              label: (item) => ` ${item.raw} Projects matched`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { precision: 0, font: { family: "Inter, sans-serif" } },
            grid: { color: "rgba(226, 232, 240, 0.6)" }
          },
          y: {
            ticks: { font: { size: 11, family: "Inter, sans-serif" } },
            grid: { display: false }
          }
        }
      }
    });
  }

  /**
   * 5. Ranked Chart: Top 10 Commercialization Candidates
   */
  renderTopRankedChart(projects) {
    const ctx = document.getElementById("chartTopRanked");
    if (!ctx) return;

    const sorted = [...projects].sort((a, b) => {
      const sa = (a.scoreData && a.scoreData.totalScore) || 0;
      const sb = (b.scoreData && b.scoreData.totalScore) || 0;
      return sb - sa;
    }).slice(0, 8);

    const labels = sorted.map(p => p.title.length > 32 ? p.title.substring(0, 29) + "..." : p.title);
    const fullTitles = sorted.map(p => p.title);
    const data = sorted.map(p => (p.scoreData && p.scoreData.totalScore) || 0);

    if (this.charts.topRanked) {
      this.charts.topRanked.destroy();
    }

    this.charts.topRanked = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Weighted Score",
          data: data,
          backgroundColor: "#059669",
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => fullTitles[items[0].dataIndex] || items[0].label,
              label: (item) => ` Score: ${item.raw}/100 (${sorted[item.dataIndex].intelligence?.specialization})`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20, font: { family: "Inter, sans-serif" } },
            grid: { color: "rgba(226, 232, 240, 0.6)" }
          },
          y: {
            ticks: { font: { size: 11, family: "Inter, sans-serif" } },
            grid: { display: false }
          }
        }
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.ChartsManager = ChartsManager;
}
