/** @format */

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActionButtons from "./ActionButtons";

const DishTable = ({ data = [], onDelete }) => {
  const navigate = useNavigate();

  // State for pagination, sorting, and dropdown filters
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [dietFilter, setDietFilter] = useState("all");
  const [flavorFilter, setFlavorFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  // Handle sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle diet filter change
  const handleDietFilterChange = (event) => {
    setDietFilter(event.target.value);
    setPage(0);
  };

  // Handle flavor filter change
  const handleFlavorFilterChange = (event) => {
    setFlavorFilter(event.target.value);
    setPage(0);
  };

  // Handle course filter change
  const handleCourseFilterChange = (event) => {
    setCourseFilter(event.target.value);
    setPage(0);
  };

  // Filter data based on dropdown filters
  const filteredData = data.filter((dish) => {
    const matchesDiet =
      dietFilter === "all" ||
      (dish.diet &&
        dish.diet.trim().toLowerCase() === dietFilter.toLowerCase());

    const matchesFlavor =
      flavorFilter === "all" ||
      (dish.flavor_profile &&
        dish.flavor_profile.toString().trim().toLowerCase() ===
          flavorFilter.toLowerCase());

    const matchesCourse =
      courseFilter === "all" ||
      (dish.course &&
        dish.course.trim().toLowerCase() === courseFilter.toLowerCase());

    return matchesDiet && matchesFlavor && matchesCourse;
  });

  // Sort data based on the selected column and order
  const sortedData = filteredData.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  // Paginate data
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={dietFilter}
                    onChange={handleDietFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Diet Filter" }}
                  >
                    <MenuItem value="all">All Diets</MenuItem>
                    <MenuItem value="vegetarian">Veg</MenuItem>
                    <MenuItem value="non vegetarian">Non-Veg</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "prep_time"}
                  direction={orderBy === "prep_time" ? order : "asc"}
                  onClick={() => handleSort("prep_time")}
                >
                  Prep Time (mins)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "cook_time"}
                  direction={orderBy === "cook_time" ? order : "asc"}
                  onClick={() => handleSort("cook_time")}
                >
                  Cook Time (mins)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={flavorFilter}
                    onChange={handleFlavorFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Flavor Filter" }}
                  >
                    <MenuItem value="all">All Flavors</MenuItem>
                    <MenuItem value="sweet">Sweet</MenuItem>
                    <MenuItem value="spicy">Spicy</MenuItem>
                    <MenuItem value="sour">Sour</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={courseFilter}
                    onChange={handleCourseFilterChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Course Filter" }}
                  >
                    <MenuItem value="all">All Courses</MenuItem>
                    <MenuItem value="main course">Main Course</MenuItem>
                    <MenuItem value="dessert">Dessert</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>State</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((dish) => (
              <TableRow key={dish._id} hover>
                <TableCell>
                  <span
                    style={{ cursor: "pointer" }} // No underline, but still clickable
                    onClick={() => navigate(`/dish/${dish._id}`)}
                  >
                    {dish.name}
                  </span>
                </TableCell>
                <TableCell>{dish.ingredients}</TableCell>
                <TableCell>{dish.diet}</TableCell>
                <TableCell>{dish.prep_time}</TableCell>
                <TableCell>{dish.cook_time}</TableCell>
                <TableCell>{dish.flavor_profile}</TableCell>
                <TableCell>{dish.course}</TableCell>
                <TableCell>{dish.state}</TableCell>
                <TableCell>{dish.region}</TableCell>
                <TableCell>
                  <ActionButtons dishId={dish._id} onDelete={onDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DishTable;
