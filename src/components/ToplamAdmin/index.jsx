import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, { useState } from 'react'

const ToplamAdmin = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleClose = () => setOpenModal(!openModal);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <div onClick={handleClose}>
                ToplamQosishi
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box className={style}>
                        <h1>Hello</h1>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default ToplamAdmin