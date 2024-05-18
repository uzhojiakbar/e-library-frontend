import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import { BoxCenter } from "src/Root/style";

const CategoryAdmin = ({ notify }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      notify("err", "Bo'sh ro'yxatni qo'sha olmaysiz!");
      return;
    }

    const newCategoryData = { name: newCategory };

    try {
      const response = await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategoryData),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        setNewCategory("");
        notify("ok", "Yangi ro'yxat muvaffaqiyatli qo'shildi!");
      } else {
        notify("err", "Ro'yxat qo'shishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      notify("err", "Server xatosi ro'yxat qo'shishda xatolik yuz berdi!");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        notify("ok", "Ro'yxat muvaffaqiyatli o'chirildi!");
      } else {
        notify("err", "Ro'yxat o'chirishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      notify("err", "Server xatosi ro'yxat o'chirishda xatolik yuz berdi!");
    }
  };

  return (
    <BoxCenter>
      <Paper
        elevation={6}
        style={{
          padding: "2rem",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Kategoriyalar
        </Typography>
        <Box display="flex" gap="1rem" mb="1.5rem">
          <TextField
            label="Yangi kategoriya nomi"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
            style={{ minWidth: "120px" }}
          >
            Qo'shish
          </Button>
        </Box>
        <Divider style={{ marginBottom: "1.5rem" }} />
        <List>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                style={{
                  backgroundColor: "#fafafa",
                  marginBottom: "0.5rem",
                  borderRadius: "8px",
                }}
              >
                <ListItemText primary={category.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Paper>
    </BoxCenter>
  );
};

export default CategoryAdmin;
