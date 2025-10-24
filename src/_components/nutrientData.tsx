"use client";

import { useEffect, useState } from "react";
import styles from "./nutrientData.module.css";

type NutrientProfileProps = {
  search: string;
};

type NutrientData = {
  foodName: string;
  servingSize: string;
  calories: number;
  macronutrients: Array<{ name: string; value: string }>;
};

export default function NutrientProfile({ search }: NutrientProfileProps) {
  const [loading, setLoading] = useState(true);
  const [nutrientData, setNutrientData] = useState<NutrientData | null>(null);
  
  useEffect(() => {
    const fetchNutrients = async () => {
      try {
        setLoading(true);        
        const res = await fetch(`http://127.0.0.1:8000/food/${encodeURIComponent(search)}`);
        const data = await res.json();
        
        if (data.length === 0) {
          setLoading(false);
          return;
        }

        const foodItem = data[0];        
        const foodName = foodItem.food_name;
        const foodDescription = foodItem.food_description;
        
        if (!foodDescription) {
          setLoading(false);
          return;
        }

        const parsedData = parseFoodDescription(foodDescription, foodName);
        setNutrientData(parsedData);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching nutrients:", e);
        setLoading(false);
      }
    };

    if (search) {
      fetchNutrients();
    }
  }, [search]);

  const parseFoodDescription = (description: string, name: string): NutrientData => {
    
  const parts = description.split(" - ");
  const servingSize = parts[0] || "Per serving";
  const nutrientsPart = parts[1] || "";
    
  let calories = 0;
  const macronutrients: Array<{ name: string; value: string }> = [];

  // Calories
  const caloriesMatch = nutrientsPart.match(/Calories:\s*(\d+(?:\.\d+)?)\s*kcal/i);
  if (caloriesMatch) {
    calories = parseFloat(caloriesMatch[1]);
  }
    
  // Fat
  const fatMatch = nutrientsPart.match(/Fat:\s*(\d+(?:\.\d+)?)\s*g/i);
  if (fatMatch) {
    macronutrients.push({ name: "Total Fat", value: `${fatMatch[1]}g` });
  }
    
  // Carbs
  const carbsMatch = nutrientsPart.match(/Carbs:\s*(\d+(?:\.\d+)?)\s*g/i);
  if (carbsMatch) {
    macronutrients.push({ name: "Total Carbohydrate", value: `${carbsMatch[1]}g` });
 }
    
  // Protien
  const proteinMatch = nutrientsPart.match(/Protein:\s*(\d+(?:\.\d+)?)\s*g/i);
  if (proteinMatch) {
    macronutrients.push({ name: "Protein", value: `${proteinMatch[1]}g` });
  }
    
  return {
    foodName: name,
    servingSize,
    calories,
    macronutrients,
  };
};

  if (loading) {
    return <div className={styles.nutrientProfile}>Loading nutritional information...</div>;
  }

  return (
    <div className={styles.nutrientProfile}>
      <h3 className={styles.nutrientTitle}>Nutritional Information: {nutrientData?.foodName}</h3>
      <p className={styles.servingSize}>Serving Size: {nutrientData?.servingSize}</p>

      <div className={styles.calorieInfo}>
        <span className={styles.calorieLabel}>Calories</span>
        <span className={styles.calorieValue}>{nutrientData?.calories}</span>
      </div>

      <div className={styles.nutrientSection}>
        <h4 className={styles.sectionTitle}>Macronutrients</h4>
        {nutrientData?.macronutrients.length > 0 ? (
          nutrientData?.macronutrients.map((nutrient, index) => (
            <div key={index} className={styles.nutrientRow}>
              <span className={styles.nutrientName}>{nutrient.name}</span>
              <span className={styles.nutrientValue}>{nutrient.value}</span>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}