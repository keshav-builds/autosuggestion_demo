"use client";
import { useState } from "react";
import { AutoSuggestion } from "autosuggestion-kit";
import type { SuggestionItem } from "autosuggestion-kit";

// Sample data
const fruits: SuggestionItem[] = [
  { id: 1, label: "Apple", metadata: { category: "Fruit" } },
  { id: 2, label: "Banana", metadata: { category: "Fruit" } },
  { id: 3, label: "Cherry", metadata: { category: "Fruit" } },
  { id: 4, label: "Date", metadata: { category: "Fruit" } },
  { id: 5, label: "Elderberry", metadata: { category: "Fruit" } },
  { id: 6, label: "Fig", metadata: { category: "Fruit" } },
  { id: 7, label: "Grape", metadata: { category: "Fruit" } },
];

const trendingSearches: SuggestionItem[] = [
  {
    id: "trending-1",
    label: "Popular searches",
    metadata: { category: "Trending" },
  },
  {
    id: "trending-2",
    label: "Latest updates",
    metadata: { category: "Trending" },
  },
  {
    id: "trending-3",
    label: "Best practices",
    metadata: { category: "Trending" },
  },
];

// Simulate API fetch
const fetchSuggestions = async (query: string): Promise<SuggestionItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

  return fruits
    .filter((fruit) => fruit.label.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5); // limit suggestions to 5
};

export default function Demo() {
  const [selectedItem, setSelectedItem] = useState<SuggestionItem | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div
        style={{
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Navigation Bar */}
          <nav
            className="responsive-nav"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Autosuggestion Kit Demo
            </span>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <a
                href="https://github.com/keshav-builds/autosuggestion_demo/blob/main/app/page.tsx"
                target="_blank"
                rel="noopener noreferrer"
                 title="view source "
                aria-label="View source on GitHub"
                style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
              >
                <img
                  src="/github.png"
                  alt="GitHub Repository"
                  style={{ width: 32, height: 32, marginRight: 8 }}
                />
                
              </a>

              {/* NPM Package Link Button */}
              <a
                href="https://www.npmjs.com/package/autosuggestion-kit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Autosuggestion Kit on npm"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "5px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 6px rgb(59 130 246 / 0.5)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
              >
                View on npm
              </a>
            </div>
          </nav>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#1e293b",
              }}
            >
              Basic Example with Static Data
            </h2>
            <p
              className="keyboard-nav-text"
              style={{
                marginTop: "0.10rem",
                fontSize: "1.0rem",
                color: "#64748b",
                fontWeight: "bold",
                userSelect: "none",
              }}
            >
              Keyboard navigation supported: Use the ↑ ↓ arrow keys to browse suggestions and Enter to select
            </p>
            <AutoSuggestion
              suggestions={fruits}
              defaultSuggestions={trendingSearches}
              showDefaultOnFocus={true}
              enableHistory={true}
              historyKey="fruits-demo"
              placeholder="  Search for fruits..."
              onSelect={(item: SuggestionItem) => {
                setSelectedItem(item);
                console.log("Selected:", item);
              }}
              onChange={(value: string) => {
                setInputValue(value);
                console.log("Input changed:", value);
              }}
              styles={{
                container: { marginBottom: "1rem" },
              }}
            />

            {selectedItem && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#e0f2fe",
                  borderRadius: "8px",
                  marginTop: "1rem",
                }}
              >
                <strong>Selected:</strong> {selectedItem.label}
                {selectedItem.metadata?.category && (
                  <span style={{ marginLeft: "8px", color: "#64748b" }}>
                    ({selectedItem.metadata.category})
                  </span>
                )}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.25rem",
                color: "#1e293b",
              }}
            >
              Async Example with API Simulation
            </h2>

            <AutoSuggestion
              fetchSuggestions={fetchSuggestions}
              enableHistory={true}
              historyKey="async-demo"
              placeholder="Search fruits (async)..."
              debounceMs={300}
              minQueryLength={1}
              onSelect={(item: SuggestionItem) => {
                console.log("Async selected:", item);
              }}
              styles={{
                input: {
                  borderColor: "#e1e8e5ff",
                },
                searchIcon: { display: "none" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
