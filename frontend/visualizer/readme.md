## Purpose
The visualizer is an engine that consumes structured objects (think JSONB rows) from the tenant database and renders the matching component stack for every page. Every component has a known prop shape with defaults, so when a tenant omits a property we still render a safe default but allow customization by overriding the props that land in the stored object.

## Demo pages
The following demo routes exist under `frontend/visualizer/demo` and each exposes:

1. `page.ts` – defines the page name and the ordered component list (type + enabled flag) that the visualizer should activate.
2. `data.ts` – exports a typed `*Data` object that fills the props for every component defined in the page file.
3. `preference.ts` – exports themed tokens (`*Preferences`) used by the components/shell for colors, spacing, typography, and interactive styles.

The current demos are:
* **home** – hero, featured stories, offerings, testimonials, newsletter, footer
* **about** – nav, hero, mission, values, timeline, team, stats, testimonials, footer
* **articles** – nav, hero, featured articles, editorial series, categories, trending, authors, newsletter, footer
* **categories** – nav, hero, category grid, featured collections, resource links, newsletter, footer
* **contact** – nav, hero, contact info, locations, form, faq, footer
* **FAQ** – nav, hero, FAQ list, support links, footer

Each folder also holds a `components/` directory (when applicable) that contains the actual TSX renderers referenced by the `page.ts` structure. They import the matching data slice (`../data`) and styling tokens (`../preference`), so extending an experience means updating both the data object and the component implementation.

## How to use
1. Pick a demo route and look at `page.ts` to see which components are expected and in what order. The visualizer will mount those components when it receives that page identifier.
2. Provide tenant-specific data by matching the shape in `data.ts`. Missing fields fall back to the defaults coded directly in the component (e.g., default buttons, placeholder copy). Prefer copying a demo data fragment into the tenant object and just editing the values you care about.
3. Update `preference.ts` if you need a different color system or spacing tokens; components read these tokens before applying Tailwind utilities.

## Extending the visualizer
When adding a new component:
* Declare its prop slice inside the `*Data` type so the schema is explicit.
* Create the TSX renderer under `components/`, applying Tailwind classes and reading the `preferences` tokens (buttons, cards, borders, hero styles) so the look can be themed.
* Register the component in the corresponding `page.ts` stack so the visualizer knows to render it.

If the component should be available across multiple pages, keep its logic in a shared file and import it from each page’s component directory.

With this setup, the visualizer can evolve by adding new demos, data objects, and components while tenants still control content purely through structured objects saved in the database.
