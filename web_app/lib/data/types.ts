import { OverviewData } from '../../features/overview/types';

export interface InventoryPrediction {
  id: string;
  productId: string;
  name: string;
  current_stock: number;
  recommended_purchase: number;
  unit: string;
}

export interface DeadStockItem {
  id: string;
  productId: string;
  name: string;
  last_sold: string | null;
  current_stock: number;
  unit: string;
}

// Stubs for future routes
export type DemoAction = {
  id: string;
  title: string;
  description: string;
  impact: string;
  route?: string;
};

export interface SearchAnalyticsData {
  title: string;
  description: string;
  explanation: string;
  labels: {
    summary: string;
    failedSearches: string;
    missingDemand: string;
    actions: string;
    searches: string;
    conversionRisk: string;
  };
  summary: Array<{
    id: string;
    label: string;
    value: string;
    caption: string;
    icon: string;
    tone: 'primary' | 'warning' | 'danger' | 'success';
  }>;
  failedSearches: Array<{
    id: string;
    query: string;
    count: number;
    lastSeen: string;
    likelyIntent: string;
    suggestedMatch: string;
  }>;
  demandInsights: Array<{
    id: string;
    title: string;
    description: string;
    estimatedRevenue: string;
    confidence: string;
    status: string;
  }>;
  actions: DemoAction[];
}

export interface ProductInsightData {
  title: string;
  description: string;
  labels: {
    searchPlaceholder: string;
    selectedProduct: string;
    productId: string;
    productName: string;
    metrics: string;
    crossSell: string;
    explanation: string;
  };
  products: Array<{
    id: string;
    name: string;
    category: string;
    stock: string;
    trend: string;
    margin: string;
    weeklySales: string;
    explanation: string;
    crossSell: Array<{
      id: string;
      name: string;
      reason: string;
      attachRate: string;
      action: string;
    }>;
  }>;
}

export interface FrequentItemPair {
  id: string;
  leftProduct: string;
  rightProduct: string;
  support: string;
  confidence: string;
  lift: string;
  revenuePotential: string;
  recommendation: string;
}

export interface FrequentItemsData {
  title: string;
  description: string;
  labels: {
    pairs: string;
    opportunities: string;
    network: string;
    support: string;
    confidence: string;
    lift: string;
    revenuePotential: string;
  };
  pairs: FrequentItemPair[];
  opportunities: DemoAction[];
  networkNodes: Array<{
    id: string;
    label: string;
    weight: number;
  }>;
}

export interface WatchlistItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  status: string;
  periodSales: string;
  stock: string;
  margin: string;
  recommendation: string;
}

export interface WatchlistData {
  title: string;
  description: string;
  labels: {
    timeframe: string;
    pinnedProducts: string;
    addProduct: string;
    addProductDescription: string;
    emptyTitle: string;
    emptyDescription: string;
    periodSales: string;
    stock: string;
    margin: string;
    recommendation: string;
  };
  timeRanges: Array<{
    label: string;
    value: string;
  }>;
  items: WatchlistItem[];
}

export type { OverviewData };
