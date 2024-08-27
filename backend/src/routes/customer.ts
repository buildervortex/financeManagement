import Customer, { validateCustomer } from "../model/customer";
import express from "express";
import errorMessage, { Error } from "../model/error";

// create the router for the customer route
const customerRouter = express.Router();

customerRouter.get("/", async (request: express.Request, response: express.Response) => {
    // get all the customers
    let customers = await Customer.find().sort({ "name": 1 })
    // send all customers
    response.send(customers);
})

customerRouter.get("/:id", async (request: express.Request, response: express.Response) => {
    // get the specified customer
    let customer = await Customer.findOne({ _id: request.params.id })
    if (!customer) return response.status(404).send(new Error("customer is not exist").getError());

    response.send(customer);
})

// set the customer create route
customerRouter.post("/", async (request: express.Request, response: express.Response) => {

    // Validate the request body to check whether that the body contains all the required details to create a customer
    const { error } = validateCustomer(request.body);

    // If there is any error. send the error with error message to the user
    if (error) return response.status(404).send(errorMessage(error).getError());

    // check for email existence
    let existingCustomer = await Customer.findOne({ email: request.body.email });
    if (existingCustomer) return response.status(400).send(new Error("The user already exists in this email").getError());

    // create the customer for saving
    const customer = new Customer({ ...request.body });

    let result = await customer.save();

    response.send(result);

})

customerRouter.put("/:id", async (request: express.Request, response: express.Response) => {
    // Validate the request body to check whether that the body contains all the required details to update the customer
    const { error } = validateCustomer(request.body);

    // If there is any error. send the error with error message to the user
    if (error) return response.status(404).send(errorMessage(error).getError());

    // check for existing customer
    let existingCustomer = await Customer.findOne({ _id: request.params.id });
    if (!existingCustomer) return response.status(404).send(new Error("customer is not exist").getError());

    // update the customer
    let result = await Customer.updateOne({ _id: request.params.id }, { $set: { ...request.body } })

    response.send(result);
})

customerRouter.delete("/:id", async (request: express.Request, response: express.Response) => {

    // check for email existence
    let existingCustomer = await Customer.findOne({ _id: request.params.id });
    if (!existingCustomer) return response.status(404).send(new Error("customer is not exist").getError());

    // delete the customer
    await Customer.deleteOne({ _id: request.params.id });

    response.send(existingCustomer);
})


export default customerRouter;