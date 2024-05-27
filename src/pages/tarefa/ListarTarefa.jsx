import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";

import CriarTarefa from "./CriarTarefa";
import EditarTarefa from "./EditarTarefa";
import { useTasks } from "../../stores/tasks";

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefa, setTarefa] = useState();

  const handleCloseEditar = () => {
    setOpenEditar(false);
    setOpen(false);
  };

  const [tasks, removeTask] = useTasks((state) => [
    state.tasks,
    state.removeTask,
  ]);

  const handleEditar = (id) => {
    setTarefa(tasks.find((task) => task.idTarefa === id));
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    removeTask(id);
    setOpenEditar(false);
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((row, indice) => (
                  <TableRow
                    key={indice}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idTarefa}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tituloTarefa}
                    </TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEditar(row.idTarefa)}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeletar(row.idTarefa)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Criar Tarefa
          </Button>
          <Button size="small" variant="outlined" onClick={handleCloseEditar}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CriarTarefa handleClose={handleClose} tarefas={tasks} />
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          open={openEditar}
          onClose={handleCloseEditar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <EditarTarefa
              handleCloseEditar={handleCloseEditar}
              tarefa={tarefa}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListarTarefa;
