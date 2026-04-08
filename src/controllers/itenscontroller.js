import db from "../database/db.js";

// Listar todos os itens
export async function getAllItens(req, res) {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.json(results);
  });
}

// Buscar item por ID
export async function getItemById(req, res) {
  const { id } = req.params;

  db.query("SELECT * FROM itens WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    res.json(results[0]);
  });
}

// Criar item
export async function createItem(req, res) {
  const { nome, quantidade } = req.body;

  if (!nome || !quantidade) {
    return res
      .status(400)
      .json({ message: "Nome e quantidade são obrigatórios" });
  }

  db.query(
    "INSERT INTO itens (nome, quantidade) VALUES (?, ?)",
    [nome, quantidade],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });

      res.status(201).json({
        id: result.insertId,
        nome,
        quantidade,
      });
    }
  );
}

// Atualizar item
export async function updateItem(req, res) {
  const { id } = req.params;
  const { nome, quantidade } = req.body;

  db.query(
    "UPDATE itens SET nome = ?, quantidade = ? WHERE id = ?",
    [nome, quantidade, id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item não encontrado" });
      }

      res.json({ message: "Item atualizado com sucesso" });
    }
  );
}

// Deletar item
export async function deleteItem(req, res) {
  const { id } = req.params;

  db.query("DELETE FROM itens WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    res.json({ message: "Item removido com sucesso" });
  });
}
