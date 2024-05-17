import React, { useState } from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";

const CategoryAdmin = ({
  categories = () => {},
  setCategories = () => {},
  notify,
}) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      notify("err", "Bo'sh ro'yxatni qo'sha olmaysiz!");
      return;
    }

    const newId =
      categories.reduce(
        (max, category) => (category.id > max ? category.id : max),
        0
      ) + 1;

    const newCategories = [...categories, { id: newId, name: newCategory }];
    setCategories(newCategories);
    setNewCategory("");
    notify("ok", "Yangi ro'yxat muvaffaqiyatli qo'shildi!");
  };

  const handleDeleteCategory = (id) => {
    const filteredCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(filteredCategories);
    notify("ok", "Ro'yxat muvaffaqiyatli o'chirildi!");
  };

  return (
    <div>
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" gutterBottom>
          Kategoriyalar
        </Typography>
        <div className="flex items-center gap-2 mb-4">
          <TextField
            label="Yangi kategoriya nomi"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddCategory}>
            Qo'shish
          </Button>
        </div>
        <List>
          {categories.map((category) => (
            <motion.div key={category.id} layout>
              <ListItem className="justify-between">
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
    </div>
  );
};

export default CategoryAdmin;
