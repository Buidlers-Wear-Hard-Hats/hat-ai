import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Hat Coin API",
            description: "API to interact with HAT Coin",
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://ai.hatmeme.xyz/",
            },
        ],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "Hat Coin Assistant",
                description: `This API provides programmatic access to the following contracts on the NEAR Protocol:      
                - **Vault Contract**: \`diamondvault.hat-coin.near\`
                - **Auction Contract**: \`auctions.hat-coin.near\`
                - **HAT Token Contract**: \`hat.tkn.near\`
                
                These contracts enable interaction with vaults, auctions, and token balances. The following endpoints are available:
                
                ### Vault Endpoints
                1. **Get the Last Vault**:
                  - **Endpoint**: \`/api/get_last_vault\`
                  - **Purpose**: Retrieve the most recently created vault.
                  - **Response**: Returns the vault details, including the method name, gas, deposit, and arguments.
          
                2. **Add Tokens to Vault**:
                - **Endpoint**: \`/api/ft_transfer_call\`
                - **Purpose**: Transfer a specified amount of HAT tokens to a vault and increase its deposit.
                - **Request Body**:
                  - \`amount\`: The amount of HAT tokens to transfer to the vault (required).
                - **Response**: Returns the function call details to transfer the tokens and increase the deposit in the vault.
                
                3. **Claim a Vault**:
                  - **Endpoint**: \`/api/claim_vault\`
                  - **Purpose**: Claim a specific vault by providing its index.
                  - **Request Body**:
                    - \`index\`: The index of the vault to claim (required).
                  - **Response**: Returns the parameters of the vault claim function call.
                
                ### Auction Endpoints
                4. **Get Current Auction Info**:
                  - **Endpoint**: \`/api/get_auction_info\`
                  - **Purpose**: Retrieve information about the current auction.
                  - **Response**: Returns details about the auction, such as method name, gas, deposit, and arguments.
          
                ### Auction Endpoints
                5. **Start or Place a Bid in Auction**:
                  - **Endpoint**: \`/api/start_or_place_bid\`
                  - **Purpose**: Start a new auction or place a bid in an existing auction. This endpoint allows interaction with the auction contract to either initiate a new auction or participate in an ongoing one.
                  - **Request Body**: None
                  - **Response**: Returns the function call details for starting or placing a bid in the auction. **NEARs are sent as a deposit to the auction contract.**
                
                6. **Claim Tokens**:
                  - **Endpoint**: \`/api/claim_tokens\`
                  - **Purpose**: Claim tokens from auction.
                  - **Request Body**: None
                  - **Response**: Returns the parameters of the auction claim tokens function call.
                  
                ### Token Endpoints
                7. **Get FT Balance of an Account**:
                  - **Endpoint**: \`/api/ft_balance_of\`
                  - **Purpose**: Retrieve the balance of HAT tokens for a specific account.
                  - **Request Body**:
                    - \`account_id\`: The NEAR account ID for which the HAT balance will be retrieved (required).
                  - **Response**: Returns the balance of the HAT token.
                
                This API simplifies the process of managing vaults, auctions, and token balances on the NEAR blockchain.`,
                instructions: `
                You are an assistant designed to interact with the following contracts on the Near Protocol:
                    - **Vault Contract**: \`diamondvault.hat-coin.near\`
                    - **Auction Contract**: \`auctions.hat-coin.near\`
                    - **HAT Token Contract**: \`hat.tkn.near\`

                    Your main functions are to use the provided API endpoints to perform both read and write operations on these contracts. Below are detailed instructions for each endpoint, including the required parameters, how to validate them, and how to handle the responses.

                    ---

                    ### **Write Operations**

                    1. **/api/get_last_vault**:
                    - **Purpose**: Retrieve the most recent vault from the contract \`diamondvault.hat-coin.near\`.
                    - **Parameters**: None.
                    - **Response**: You will receive a function call object with the \`methodName\` and other required parameters.
                    - **Instructions**:
                        - Clearly indicate to the user that this is a function call object that must be sent to the blockchain.
                        - Describe the returned vault details based on the contract response.

                    2. **/api/ft_transfer_call**:
                    - **Purpose**: Transfer a specified amount of HAT tokens to a vault.
                    - **Parameters**:
                        - \`amount\` (required): The amount of HAT tokens to transfer. Must be a valid positive number (integer or decimal).
                    - **Validation**:
                        - Ensure the \`amount\` is provided and is a valid number.
                        - If the \`amount\` is missing or invalid, ask the user to provide a valid number (e.g., "Please provide a valid amount of HAT tokens to transfer, such as '10' or '5.5'.").
                    - **Response**: You will receive a function call object.
                    - **Instructions**:
                        - Inform the user that the result is a function call object that requires submission to the blockchain.
                        - Explain that the \`amount\` is passed to the \`hat.tkn.near\` contract, increasing the vault's deposit.

                    3. **/api/claim_vault**:
                    - **Purpose**: Claim a vault by its index.
                    - **Parameters**:
                        - \`index\` (required): The index of the vault to claim. Must be a valid integer.
                    - **Validation**:
                        - Ensure the \`index\` is provided and is a valid integer.
                        - If the \`index\` is missing or invalid, ask the user to provide a valid integer (e.g., "Please provide a valid vault index, such as '1' or '2'.").
                    - **Response**: You will receive a function call object.
                    - **Instructions**:
                        - Confirm the returned function call object is ready for blockchain submission.
                        - Explain that this action claims a specific vault from the \`diamondvault.hat-coin.near\` contract.

                    4. **/api/start_or_place_bid**:
                    - **Purpose**: Start a new auction or place a bid in an existing auction.
                    - **Parameters**: None.
                    - **Response**: You will receive a function call object.
                    - **Instructions**:
                        - Inform the user that the returned object is a function call object that must be submitted to the blockchain.
                        - Explain that NEAR tokens will be sent as a deposit to the \`auctions.hat-coin.near\` contract.

                    5. **/api/claim_tokens**:
                    - **Purpose**: Claim tokens from the auction.
                    - **Parameters**: None.
                    - **Response**: You will receive a function call object.
                    - **Instructions**:
                        - Emphasize that the returned object must be submitted to the blockchain.
                        - Explain that the function call object includes the method name \`claim_tokens\` with predefined gas and deposit parameters.

                    ---

                    ### **Read Operations**

                    1. **/api/get_last_vault**:
                    - **Purpose**: Fetch the latest vault information.
                    - **Parameters**: None.
                    - **Response**: Returns details about the most recent vault.
                    - **Instructions**:
                        - Describe the returned vault details based on the contract response.

                    2. **/api/get_auction_info**:
                    - **Purpose**: Retrieve the current auction information.
                    - **Parameters**: None.
                    - **Response**: Returns details about the current auction.
                    - **Instructions**:
                        - Provide the latest auction details transparently.

                    3. **/api/ft_balance_of**:
                    - **Purpose**: Check the HAT token balance for a specified NEAR account.
                    - **Parameters**:
                        - \`account_id\` (required): The NEAR account ID. Must be a valid string.
                    - **Validation**:
                        - Ensure the \`account_id\` is provided and is a valid NEAR account ID.
                        - If the \`account_id\` is missing or invalid, ask the user to provide a valid NEAR account ID (e.g., "Please provide a valid NEAR account ID, such as 'example.near'.").
                    - **Response**: Returns the balance of the specified account in HAT tokens.
                    - **Instructions**:
                        - Explain that this operation retrieves the balance from the \`hat.tkn.near\` contract.

                    ---

                    ### **Important Notes**

                    1. **Input Validation**:
                    - Always validate user-provided inputs to ensure they are complete and of the correct type.
                    - If any required parameter is missing or invalid, ask the user to provide the correct information.

                    2. **Communication**:
                    - Clearly communicate the purpose and result of each endpoint interaction.
                    - For write operations, emphasize that the returned objects are not final results but require execution on the blockchain.

                    3. **Error Handling**:
                    - If the server returns an error, inform the user and guide them to correct their input.
                    - Avoid using special characters or incorrect formatting in the parameters to prevent issues with the contract.

                    ---

                    ### **Restrictions**

                    🚨 **Swap Restriction** 🚨
                    - **Swapping HAT tokens for any other token is strictly prohibited.**
                    - If a user requests a swap involving HAT, you must reject the request and inform them that swaps involving HAT tokens are not allowed.
                    - However, **converting NEAR to HAT tokens is allowed**. This means the user can convert NEAR to HAT, but **any conversion from HAT to another token will be blocked**.
                    - Do not generate function call objects or provide guidance for any swap-related operations involving HAT to other tokens.
                    - Ensure that no interaction occurs with DEX contracts or other mechanisms that facilitate token exchanges involving HAT.

                    ---

                    ### **Vault Deposit Process**

                    To **add NEAR to the vault**, the following steps must be followed:
                    1. First, **convert NEAR to HAT tokens**. This is necessary because the vault accepts deposits in HAT tokens.
                    2. After the conversion to HAT, the **HAT tokens can be sent to the vault**.
                    3. The process of sending HAT to the vault will require a valid \`amount\` of HAT tokens to be transferred.
                    4. The **resulting function call object** for both the NEAR-to-HAT conversion and the HAT deposit to the vault must be submitted to the blockchain for execution.
                    5. Make sure to communicate clearly to the user that the NEAR-to-HAT conversion is the first step in the deposit process and that the HAT tokens will later be sent to the vault.
                    `,
                tools: [{ type: "generate-transaction" }, { type: "generate-evm-tx" }, { type: "sign-message" }],
                image: "https://hat.ow.academy/assets/icon.png",
                categories: ["memes"],
            },
        },
        paths: {
            "/api/ft_balance_of": {
                get: {
                    tags: ["Token"],
                    summary: "Get the FT balance of an account",
                    description:
                        "This endpoint retrieves the balance of a HAT token for a specified account by account_id.",
                    operationId: "ft_balance_of",
                    parameters: [
                        {
                            name: "account_id",
                            in: "query",
                            description: "The NEAR account_id for which to retrieve the HAT balance",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Successful response with the HAT balance",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            balance: {
                                                type: "string",
                                                description:
                                                    "The balance of the HAT token in the smallest unit (e.g., yocto tokens)",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/get_last_vault": {
                get: {
                    tags: ["Vault"],
                    summary: "Get the last vault",
                    description:
                        "This endpoint allows you to retrieve the most recent vault from the contract.",
                    operationId: "get-last-vault",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                    },
                                                    args: {
                                                        type: "object",
                                                    },
                                                    gas: {
                                                        type: "string",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/get_auction_info": {
                get: {
                    tags: ["Auction"],
                    summary: "Get the current auction info",
                    description:
                        "This endpoint retrieves the current auction info from the contract.",
                    operationId: "get_auction_info",
                    responses: {
                        "200": {
                            description: "Successful response with the current auction info",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                    },
                                                    args: {
                                                        type: "object",
                                                    },
                                                    gas: {
                                                        type: "string",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/ft_transfer_call": {
                post: {
                    tags: ["Vault"],
                    summary: "Add Tokens to Vault",
                    description: "Transfer a specified amount of HAT tokens to a vault and increase its deposit.",
                    operationId: "ft_transfer_call",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        amount: {
                                            type: "string",
                                            description: "The amount of HAT tokens to transfer to the vault. Must be a positive number (e.g., '10' or '5.5').",
                                        },
                                    },
                                    required: ["amount"],
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Successful function call object",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                        example: "ft_transfer_call",
                                                    },
                                                    args: {
                                                        type: "object",
                                                        properties: {
                                                            receiver_id: {
                                                                type: "string",
                                                                example: "diamondvault.hat-coin.near",
                                                            },
                                                            amount: {
                                                                type: "string",
                                                                example: "10000000000000000000", // 10 HAT en yoctoHAT
                                                            },
                                                            msg: {
                                                                type: "string",
                                                                example: '{"action_to_execute":"increase_deposit"}',
                                                            },
                                                        },
                                                        required: ["receiver_id", "amount", "msg"],
                                                    },
                                                    gas: {
                                                        type: "string",
                                                        example: "200000000000000",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                        example: "1",
                                                    },
                                                },
                                                required: ["methodName", "args", "gas", "deposit"],
                                            },
                                        },
                                        required: ["type", "params"],
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Bad request. The 'amount' field is missing or invalid.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                example: "Invalid request body. 'amount' is required.",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/claim_vault": {
                post: {
                    tags: ["Vault"],
                    summary: "Claim a vault",
                    description:
                        "This endpoint allows you to claim a vault by providing the index of the vault.",
                    operationId: "claim-vault",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        index: {
                                            type: "integer",
                                        },
                                    },
                                    required: ["index"],
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                    },
                                                    args: {
                                                        type: "object",
                                                        properties: {
                                                            index: {
                                                                type: "integer",
                                                            },
                                                        },
                                                    },
                                                    gas: {
                                                        type: "string",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/start_or_place_bid": {
                post: {
                    tags: ["Auction"],
                    summary: "Start or Place a Bid in Auction",
                    description:
                        "Start a new auction or place a bid in an existing auction.",
                    operationId: "start_or_place_bid",
                    requestBody: {
                        required: false,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Successful function call object",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                    },
                                                    args: {
                                                        type: "object",
                                                        properties: {},
                                                    },
                                                    gas: {
                                                        type: "string",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/claim_tokens": {
                post: {
                    tags: ["Auction"],
                    summary: "Claim tokens",
                    description:
                        "This endpoint allows users to claim their tokens from the auction.",
                    operationId: "claim_tokens",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {}, // Deja vacío, ya que no hay cuerpo de solicitud
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Successful response with function call details",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                                enum: ["FunctionCall"],
                                            },
                                            params: {
                                                type: "object",
                                                properties: {
                                                    methodName: {
                                                        type: "string",
                                                        example: "claim_tokens",
                                                    },
                                                    args: {
                                                        type: "object",
                                                        description: "No arguments are required",
                                                    },
                                                    gas: {
                                                        type: "string",
                                                        example: "300000000000000",
                                                    },
                                                    deposit: {
                                                        type: "string",
                                                        example: "10000000000000000000",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/{token}": {
                get: {
                    operationId: "get-token-metadata",
                    description:
                        "Get token metadata from Ref Finance. Token identifiers can be the name, symbol, or contractId and will be fuzzy matched automatically.",
                    parameters: [
                        {
                            name: "token",
                            in: "path",
                            description: "The identifier for the token to get metadata for.",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            symbol: {
                                                type: "string",
                                            },
                                            decimals: {
                                                type: "number",
                                            },
                                            icon: {
                                                type: "string",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/swap/{tokenIn}/{tokenOut}/{quantity}": {
                get: {
                    operationId: "get-swap-transactions",
                    description:
                        "Get a transaction payload for swapping between two tokens using the best trading route on Ref.Finance. Token identifiers can be the name, symbol, or contractId and will be fuzzy matched automatically.",
                    parameters: [
                        {
                            name: "tokenIn",
                            in: "path",
                            description: "The identifier for the input token.",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: "tokenOut",
                            in: "path",
                            description: "The identifier for the output token.",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: "quantity",
                            in: "path",
                            description: "The amount of tokens to swap (input amount).",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                signerId: {
                                                    type: "string",
                                                    description:
                                                        "The account ID that will sign the transaction",
                                                },
                                                receiverId: {
                                                    type: "string",
                                                    description:
                                                        "The account ID of the contract that will receive the transaction",
                                                },
                                                actions: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            type: {
                                                                type: "string",
                                                                description: "The type of action to perform",
                                                            },
                                                            params: {
                                                                type: "object",
                                                                properties: {
                                                                    methodName: {
                                                                        type: "string",
                                                                        description:
                                                                            "The name of the method to be called",
                                                                    },
                                                                    args: {
                                                                        type: "object",
                                                                        description:
                                                                            "Arguments for the function call",
                                                                    },
                                                                    gas: {
                                                                        type: "string",
                                                                        description:
                                                                            "Amount of gas to attach to the transaction",
                                                                    },
                                                                    deposit: {
                                                                        type: "string",
                                                                        description:
                                                                            "Amount to deposit with the transaction",
                                                                    },
                                                                },
                                                                required: [
                                                                    "methodName",
                                                                    "args",
                                                                    "gas",
                                                                    "deposit",
                                                                ],
                                                            },
                                                        },
                                                        required: ["type", "params"],
                                                    },
                                                },
                                            },
                                            required: ["signerId", "receiverId", "actions"],
                                        },
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "The error message",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    return NextResponse.json(pluginData);
}