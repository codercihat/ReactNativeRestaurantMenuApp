import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealGridTile from "../components/MealGridTile";
import { useEffect } from "react";
const MealsOverviewScreen = ({ route, navigation }) => {
  const catID = route.params.categoryId;

  function renderMealItem(itemData) {
    return (
      <MealGridTile
        title={itemData.item.title}
        duration={itemData.item.duration}
        imageUrl={itemData.item.imageUrl}
        ingredients={itemData.item.ingredients}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
      />
    );
  }
  useEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catID
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catID, navigation]);
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catID) >= 0;
  });

  return (
    <FlatList
      data={displayedMeals}
      keyExtractor={(item) => item.id}
      renderItem={renderMealItem}
      /* numColumns={2} */
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverviewScreen;
