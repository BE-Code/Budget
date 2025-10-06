import { StyleSheet, Text, View, FlatList } from 'react-native';

interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
}

const sampleBudgetData: BudgetCategory[] = [
  { id: '1', name: 'Groceries', budgetAmount: 800, spentAmount: 450, remainingAmount: 350 },
  { id: '2', name: 'Transportation', budgetAmount: 300, spentAmount: 120, remainingAmount: 180 },
  { id: '3', name: 'Entertainment', budgetAmount: 200, spentAmount: 85, remainingAmount: 115 },
  { id: '4', name: 'Utilities', budgetAmount: 250, spentAmount: 240, remainingAmount: 10 },
  { id: '5', name: 'Healthcare', budgetAmount: 150, spentAmount: 75, remainingAmount: 75 },
  { id: '6', name: 'Dining Out', budgetAmount: 300, spentAmount: 280, remainingAmount: 20 },
  { id: '7', name: 'Shopping', budgetAmount: 400, spentAmount: 150, remainingAmount: 250 },
];

const BudgetCategoryItem = ({ item }: { item: BudgetCategory }) => {
  const percentageSpent = (item.spentAmount / item.budgetAmount) * 100;
  const isLowFunds = item.remainingAmount < item.budgetAmount * 0.2;

  return (
    <View style={styles.categoryItem}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={[styles.remainingAmount, isLowFunds && styles.lowFunds]}>
          ${item.remainingAmount}
        </Text>
      </View>
      <View style={styles.budgetInfo}>
        <Text style={styles.budgetDetails}>
          ${item.spentAmount} / ${item.budgetAmount}
        </Text>
        <Text style={styles.percentage}>{percentageSpent.toFixed(0)}% used</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${Math.min(percentageSpent, 100)}%` },
            percentageSpent > 90 && styles.progressBarWarning
          ]}
        />
      </View>
    </View>
  );
};

export default function BudgetCategoryList() {
  return (
    <>
      <Text style={styles.title}>Budget Categories</Text>
      <FlatList
        data={sampleBudgetData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BudgetCategoryItem item={item} />}
        style={styles.list}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  remainingAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  lowFunds: {
    color: '#f44336',
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  budgetDetails: {
    fontSize: 14,
    color: '#666',
  },
  percentage: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 3,
  },
  progressBarWarning: {
    backgroundColor: '#ff9800',
  },
});
