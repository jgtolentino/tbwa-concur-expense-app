import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import { useExpenseStore } from "@/store/expenseStore";
import CategoryPicker from "@/components/CategoryPicker";
import { colors } from "@/constants/colors";
import { Camera, Image } from "lucide-react-native";

type ExpenseFormProps = {
  initialValues?: {
    amount: string;
    description: string;
    date: string;
    category: string;
    receiptUrl?: string;
  };
  expenseId?: string;
};

export default function ExpenseForm({
  initialValues,
  expenseId,
}: ExpenseFormProps = {}) {
  const router = useRouter();
  const { addExpense, updateExpense } = useExpenseStore();
  
  const [amount, setAmount] = useState(initialValues?.amount || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [date, setDate] = useState(
    initialValues?.date || new Date().toISOString()
  );
  const [category, setCategory] = useState(initialValues?.category || "food");
  const [receiptUrl, setReceiptUrl] = useState(initialValues?.receiptUrl || "");
  
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setReceiptUrl(result.assets[0].uri);
    }
  };
  
  const handleSubmit = () => {
    if (!amount || !description || !category) {
      alert("Please fill in all required fields");
      return;
    }
    
    const expenseData = {
      amount: parseFloat(amount),
      description,
      date,
      category,
      receiptUrl,
    };
    
    if (expenseId) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    
    router.back();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount ($)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor={colors.gray[400]}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="What was this expense for?"
            multiline
            placeholderTextColor={colors.gray[400]}
          />
        </View>
        
        <CategoryPicker
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.dateText}>
            {format(new Date(date), "MMMM d, yyyy")}
          </Text>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Receipt (Optional)</Text>
          <Pressable style={styles.imageButton} onPress={handlePickImage}>
            {receiptUrl ? (
              <View style={styles.receiptContainer}>
                <Text style={styles.receiptText}>Receipt uploaded</Text>
                <Image color={colors.primary} size={20} />
              </View>
            ) : (
              <View style={styles.receiptContainer}>
                <Text style={styles.receiptText}>Add receipt image</Text>
                <Camera color={colors.primary} size={20} />
              </View>
            )}
          </Pressable>
        </View>
        
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {expenseId ? "Update Expense" : "Add Expense"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageButton: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  receiptContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  receiptText: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});