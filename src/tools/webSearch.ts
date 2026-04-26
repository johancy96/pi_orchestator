import { chromium } from 'playwright-core';
import { Type } from '@sinclair/typebox';

export const registerWebSearchTool = (pi: any) => {
  pi.registerTool({
    name: "playwright_search",
    label: "Web Search",
    description: "Search the web or extract text from a specific URL using the system's Chrome browser. Use this to read documentation, search for errors, or find recent information.",
    parameters: Type.Object({
      query: Type.Optional(Type.String({ description: "The search query to look up on DuckDuckGo." })),
      url: Type.Optional(Type.String({ description: "A specific URL to visit and extract text from. If provided, query is ignored." }))
    }),
    execute: async (toolCallId: string, params: any, signal: any, onUpdate: any, ctx: any) => {
      if (!params.query && !params.url) {
        return { content: [{ type: "text", text: "Error: You must provide either a query or a url." }], isError: true };
      }

      onUpdate?.({ text: "Launching Chrome browser in background..." });
      let browser;
      try {
        browser = await chromium.launch({ channel: 'chrome', headless: true });
        const page = await browser.newPage();
        
        let targetUrl = params.url;
        if (!targetUrl && params.query) {
          onUpdate?.({ text: `Searching DuckDuckGo for: ${params.query}` });
          targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(params.query)}`;
        } else {
          onUpdate?.({ text: `Navigating to ${targetUrl}...` });
        }

        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        
        onUpdate?.({ text: "Extracting readable content..." });
        // Basic extraction of text content, removing boilerplate
        const textContent = await page.evaluate(() => {
          // Remove scripts, styles, and invisible elements to get clean text
          const elementsToRemove = document.querySelectorAll('script, style, noscript, nav, footer, iframe, header, svg');
          elementsToRemove.forEach(el => el.remove());
          
          return document.body.innerText.trim();
        });

        await browser.close();

        // Limit the extracted text to prevent blowing up the context window
        const maxLength = 12000;
        const finalContent = textContent.length > maxLength 
          ? textContent.substring(0, maxLength) + "\n\n[Content truncated due to length]" 
          : textContent;

        return {
          content: [{ type: "text", text: finalContent }],
          isError: false
        };

      } catch (error: any) {
        if (browser) await browser.close();
        return {
          content: [{ type: "text", text: `Web search failed: ${error.message}` }],
          isError: true
        };
      }
    }
  });
};
