import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    if (goalTitle === 0) {
      return;
    }
    setCourseGoal(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle, }]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoal(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen} >
      <Button title='Add new Goal' onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} addGoal={addGoalHandler} cancelGoal={cancelGoalAdditionHandler} />
      <FlatList keyExtractor={item => item.id} data={courseGoals} renderItem={itemData => (
        <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={removeGoalHandler} />
      )}
      />
    </ View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
