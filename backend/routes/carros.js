const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/carrosController');
const upload  = require('../config/upload');

router.get('/',       ctrl.listar);
router.get('/:id',    ctrl.buscarPorId);
router.post('/',      upload.single('imagem'), ctrl.criar);
router.put('/:id',    upload.single('imagem'), ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

module.exports = router;
