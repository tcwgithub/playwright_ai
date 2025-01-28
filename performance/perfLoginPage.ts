import { Page } from '@playwright/test';

export class PerfLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async measurePerformance() {
    const [response] = await Promise.all([
      this.page.goto('/inventory.html'),
      this.page.waitForNavigation(), // wait for navigation to complete
    ]);

    const performanceMetrics = await this.page.evaluate(() => {
      return JSON.parse(JSON.stringify(window.performance));
    });

    console.log('Performance Metrics:');
    
    // Readable timing breakdown
    const navigationStart = performanceMetrics.timing.navigationStart;
    const requestStart = performanceMetrics.timing.requestStart;
    const responseStart = performanceMetrics.timing.responseStart;
    const responseEnd = performanceMetrics.timing.responseEnd;
    const domLoading = performanceMetrics.timing.domLoading;
    const domContentLoadedEventEnd = performanceMetrics.timing.domContentLoadedEventEnd;
    const loadEventEnd = performanceMetrics.timing.loadEventEnd;

    // Calculate times in ms
    const requestTime = requestStart - navigationStart;
    const responseTime = responseEnd - responseStart;
    const domParseTime = domContentLoadedEventEnd - domLoading;
    const totalPageLoadTime = loadEventEnd - navigationStart;

    // Print out metrics in a more readable format
    console.log(`- Request Time (NAV Start to REQ Start): ${requestTime} ms`);
    console.log(`- Response Time (RES Start to RES End): ${responseTime} ms`);
    console.log(`- Browser time takes to build the page from HTML : ${domParseTime} ms`);
    console.log(`- Total Page Load Time (NAV Start to Load Event End): ${totalPageLoadTime} ms`);

    return totalPageLoadTime;
  }
}
