import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { categories } from "@/constants/categories";
import { colors } from "@/constants/colors";

type CategoryPickerProps = {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
};

export default function CategoryPicker({
  selectedCategory,
  onSelectCategory,
}: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategory === category.id
                    ? category.color
                    : colors.gray[200],
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedCategory === category.id
                      ? "white"
                      : colors.gray[700],
                },
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});