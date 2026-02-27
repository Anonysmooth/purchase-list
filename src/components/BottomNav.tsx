import type { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  listCount: number;
}

export function BottomNav({ activeTab, onTabChange, listCount }: BottomNavProps) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'list', label: 'Ma liste', icon: '📋' },
    { id: 'catalog', label: 'Catalogue', icon: '🔍' },
    { id: 'stock', label: 'Mon stock', icon: '🏠' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe z-50">
      <div className="flex max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${
              activeTab === tab.id
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <span className="text-xl relative">
              {tab.icon}
              {tab.id === 'list' && listCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                  {listCount > 9 ? '9+' : listCount}
                </span>
              )}
            </span>
            <span className={`text-xs mt-0.5 font-medium ${activeTab === tab.id ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
