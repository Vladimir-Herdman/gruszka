import styles from "./nutrientData.module.css";

type NutrientProfileProps = {
  search: string;
};

export default function NutrientProfile({ search }: NutrientProfileProps) {
    //TODO: fill in the data with nutrients from api call
    const nutrientData = {
    servingSize: "100g",
    calories: 52,
    other: [
      { name: "Total Fat", value: "2g", dailyValue: "0%" },
    ],
    vitamins: [
      { name: "Vitamin A", value: "54g", dailyValue: "6%" },
    ],
  };

  return (
    <div className={styles.nutrientProfile}>
      <h3 className={styles.nutrientTitle}>Nutritional Information: {search}</h3>
      <p className={styles.servingSize}>Serving Size: {nutrientData.servingSize}</p>
      
      <div className={styles.calorieInfo}>
        <span className={styles.calorieLabel}>Calories</span>
        <span className={styles.calorieValue}>{nutrientData.calories}</span>
      </div>

      <div className={styles.nutrientSection}>
        <h4 className={styles.sectionTitle}>Whatever this is</h4>
        {nutrientData.other.map((nutrient, index) => (
          <div key={index} className={styles.nutrientRow}>
            <span className={styles.nutrientName}>{nutrient.name}</span>
            <span className={styles.nutrientValue}>{nutrient.value}</span>
            <span className={styles.dailyValue}>{nutrient.dailyValue}</span>
          </div>
        ))}
      </div>

      <div className={styles.nutrientSection}>
        <h4 className={styles.sectionTitle}>Vitamins</h4>
        {nutrientData.vitamins.map((vitamin, index) => (
          <div key={index} className={styles.nutrientRow}>
            <span className={styles.nutrientName}>{vitamin.name}</span>
            <span className={styles.nutrientValue}>{vitamin.value}</span>
            <span className={styles.dailyValue}>{vitamin.dailyValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}