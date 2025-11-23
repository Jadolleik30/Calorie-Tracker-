import React, { useState } from "react";

function Tracker() {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    type: "Breakfast",
  });
  const [meals, setMeals] = useState([]);

  const totalCalories = meals.reduce(
    (sum, m) => sum + Number(m.calories || 0),
    0
  );
  const remaining = Math.max(dailyGoal - totalCalories, 0);
  const percentage =
    dailyGoal > 0 ? Math.min((totalCalories / dailyGoal) * 100, 100) : 0;

  function handleGoalChange(e) {
    setDailyGoal(Number(e.target.value) || 0);
  }

  function handleMealChange(e) {
    const { name, value } = e.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddMeal(e) {
    e.preventDefault();
    if (!meal.name || !meal.calories) return;

    const newMeal = {
      id: Date.now(),
      ...meal,
    };

    setMeals((prev) => [...prev, newMeal]);
    setMeal({ name: "", calories: "", type: meal.type });
  }

  function handleDelete(id) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  function handleClear() {
    setMeals([]);
  }

  return (
    <section className="page">
      <h2>Daily Calorie Tracker</h2>

      <div className="tracker-grid">
      {}
        <div className="card">
          <h3>Daily Goal</h3>
          <label className="inline-label">
            Calories:
            <input
              type="number"
              value={dailyGoal}
              onChange={handleGoalChange}
              min="0"
            />
          </label>

          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p>
              <strong>{totalCalories}</strong> / {dailyGoal} kcal
            </p>
            <p>
              Remaining: <strong>{remaining}</strong> kcal
            </p>
          </div>

          <hr />

          <h3>Add a Meal</h3>
          <form className="form" onSubmit={handleAddMeal}>
            <label>
              Meal name
              <input
                name="name"
                value={meal.name}
                onChange={handleMealChange}
                placeholder="e.g. Chicken salad"
                required
              />
            </label>

            <label>
              Calories
              <input
                type="number"
                name="calories"
                value={meal.calories}
                onChange={handleMealChange}
                placeholder="e.g. 450"
                min="0"
                required
              />
            </label>

            <label>
              Type
              <select
                name="type"
                value={meal.type}
                onChange={handleMealChange}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
                <option>Drink</option>
              </select>
            </label>

            <button className="btn primary" type="submit">
              Add Meal
            </button>
          </form>
        </div>

        {/* Right: list */}
        <div className="card">
          <div className="card-header">
            <h3>Today&apos;s Meals</h3>
            {meals.length > 0 && (
              <button className="btn secondary" onClick={handleClear}>
                Clear All
              </button>
            )}
          </div>

          {meals.length === 0 ? (
            <p className="muted">
              No meals added yet. Start by adding your first meal on the left.
            </p>
          ) : (
            <ul className="meal-list">
              {meals.map((m) => (
                <li key={m.id} className="meal-item">
                  <div>
                    <strong>{m.name}</strong>
                    <span className="meal-type">{m.type}</span>
                  </div>
                  <div className="meal-right">
                    <span className="meal-calories">{m.calories} kcal</span>
                    <button
                      className="btn danger btn-sm"
                      onClick={() => handleDelete(m.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tracker;
