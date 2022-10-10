const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Server Up and Running ...')
})

module.exports = router