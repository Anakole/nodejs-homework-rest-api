const express = require("express");

const ctrl = require("../../controllers");
const {
    validateBody,
    isValidId,
    authenticate,
} = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get(
    "/:contactId",
    authenticate,
    isValidId,
    ctrl.getContactById
);

router.post(
    "/",
    authenticate,
    validateBody(contactSchemas.addSchema),
    ctrl.addContact
);

router.delete(
    "/:contactId",
    authenticate,
    isValidId,
    ctrl.removeContact
);

router.put(
    "/:contactId",
    authenticate,

    isValidId,
    validateBody(contactSchemas.addSchema),
    ctrl.updateContact
);

router.patch(
    "/:contactId/favorite",
    authenticate,
    isValidId,
    validateBody(contactSchemas.updateFavoriteSchema),
    ctrl.updateStatusContact
);

module.exports = router;