const userRouter = require("./userRoute")
const categoryRouter= require("./categoryRoute")
const uploadRouter= require("./upload")
const productRouter= require("./productRoute")
const cartRouter= require("./cartRoute")
const orderRouter= require("./orderRoute")


const route = (app) => {
  app.use("/api/user", userRouter)
  app.use("/api",categoryRouter)
  app.use("/api",uploadRouter)
  app.use("/api",productRouter)
  app.use("/api/carts",cartRouter)
  app.use("/api/orders",orderRouter)
}

module.exports = route;  