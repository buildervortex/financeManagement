import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import ErrorMessage from "../model/error";
import fetchSuggestionsFromGemini from "../services/aiServices";

const aiRouter = express.Router();
aiRouter.post("/suggestions", jwtAuth, async (request, response) => {
    const prompt: string = request.body.prompt;

    if (!prompt || typeof prompt !== 'string') {
        return response.status(400).json(ErrorMessage.errorMessageFromString("Prompt is required and must be a string."));
    }

    try {
        const suggestion = await fetchSuggestionsFromGemini(prompt);
        response.send(suggestion);
    } catch (error) {
        if (error instanceof Error){
        return response.status(500).send(ErrorMessage.errorMessageFromString(error.message));
    }}
});

export default aiRouter;