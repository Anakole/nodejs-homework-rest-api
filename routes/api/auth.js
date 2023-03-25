const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);
router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrl.login
);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
