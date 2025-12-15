"use client";

import React, { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/auth";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import {
  useGetAllItems,
  useDeleteItem,
  useCreateItem,
  useUpdateItem,
} from "@/hooks/useCrud";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, loading, error } = useGetAllItems();
  const { deleteItem } = useDeleteItem();
  const { createItem } = useCreateItem();
  const { updateItem } = useUpdateItem();
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [nameInput, setNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const handleRowClick = (e: React.MouseEvent, id: string) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return; // ignore clicks on buttons
    router.push(`/items/${id}`);
  };

  const openCreateModal = () => {
    setSelectedItem(null);
    setNameInput("");
    setLocationInput("");
    setDateInput("");
    setModalOpen(true);
  };

  const openUpdateModal = (item: any) => {
    setSelectedItem(item);
    setNameInput(item.name);
    setLocationInput(item.location);
    setDateInput(
      item.date ? new Date(item.date).toISOString().slice(0, 16) : ""
    );
    setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: nameInput,
      location: locationInput,
      date: new Date(dateInput),
    };
    if (selectedItem) {
      await updateItem(selectedItem.id, payload);
    } else {
      await createItem(payload);
    }
    setModalOpen(false);
    router.refresh();
  };

  const openDeleteModal = (item: any) => {
    setSelectedItem(item);
    setDeleteOpen(true);
    handleCloseMenu();
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await deleteItem(selectedItem.id);
      setDeleteOpen(false);
      router.refresh();
    }
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    setSelectedItem(item);
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        {user && (
          <Button variant="contained" color="primary" onClick={openCreateModal}>
            <AddIcon fontSize="small" />
            {!isSmallScreen && "Create Item"}
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              {user && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={(e) => handleRowClick(e, item.id!)}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {item.date ? new Date(item.date).toLocaleString() : ""}
                </TableCell>
                {user && (
                  <TableCell>
                    <IconButton onClick={(e) => handleOpenMenu(e, item)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Actions Menu */}
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleCloseMenu}>
        <MenuItem onClick={() => openUpdateModal(selectedItem)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Update
        </MenuItem>
        <MenuItem onClick={() => openDeleteModal(selectedItem)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Update Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {selectedItem ? "Update Item" : "Create Item"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <TextField
              label="Location"
              fullWidth
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <TextField
              label="Date & Time"
              type="datetime-local"
              fullWidth
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={!nameInput || !locationInput || !dateInput}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedItem?.name}"?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
