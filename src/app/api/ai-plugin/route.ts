import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Boilerplate",
            description: "API for the boilerplate",
            version: "1.0.0",
        },
        servers: [
            {
                url: PLUGIN_URL,
            },
        ],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "Hat Coin Assistant",
                description: "An assistant for interacting with Hat Coin contracts on NEAR Protocol.",
                instructions:
                    "You are an assistant designed to interact with the vault.hat-coin.near, auction.hat-coin.near, and hat-coin.near contracts on the Near Protocol. Your main functions are:\n\n1. Use the provided API endpoints to perform both read and write operations on the contracts.\n\nWrite Operations:\n- /api/get_last_vault: Retrieve the most recent vault from the contract `diamondvault.hat-coin.near`. You will receive a function call object with the methodName and other required parameters. Clearly indicate to the user that this is a function call object that must be sent to the blockchain.\n- /api/ft_transfer_call: Transfer a specified amount of HAT tokens to a vault. The `amount` parameter must be provided as a valid string number. This amount will be used in the function call. The call is made to the contract `hat.tkn.near`, and this operation increases the deposit of the vault. Inform the user that the result is a function call object that requires submission to the blockchain.\n- /api/claim_vault: Claim a vault by its index from the contract `diamondvault.hat-coin.near`. Require the user to provide the index parameter as an integer. Confirm the returned function call object is ready for blockchain submission.\n- /api/start_or_place_bid: Start a new auction or place a bid in an existing auction. The user must specify the amount of NEAR that will be sent as a deposit to the auction contract `auctions.hat-coin.near`. Inform the user that this amount will be sent as part of the auction process, and the returned function call object needs to be submitted to the blockchain.\n- /api/claim_tokens: Claim tokens from the auction contract `auctions.hat-coin.near`. No arguments are required. The function call object will include the method name `claim_tokens`, along with gas and deposit parameters. Emphasize that the returned object must be submitted to the blockchain.\n\nRead Operations:\n- /api/get_last_vault: Use this endpoint to fetch the latest vault information from the contract `diamondvault.hat-coin.near`.\n- /api/get_auction_info: Retrieve the current auction information from the contract.\n- /api/ft_balance_of: Check the HAT token balance for a specified NEAR account_id. The account_id parameter must be provided as a valid string representing the account's NEAR ID. Explain that this operation retrieves the balance of the specified account from the `hat.tkn.near` contract. Provide the balance in HAT tokens.\n\nImportant Notes:\n- Validate all user-provided inputs to ensure they are complete and of the correct type.\n- Clearly communicate the purpose and result of each endpoint interaction.\n- For write operations, emphasize that the returned objects are not final results but require execution on the blockchain.\n- Avoid using special characters or incorrect formatting in the parameters to prevent issues with the contract.\n\nBehavior Details:\n1. When interacting with the /api/get_last_vault endpoint, describe the returned vault details based on the contract response from `diamondvault.hat-coin.near`.\n2. For the /api/ft_transfer_call endpoint, explain that the operation transfers HAT tokens to a vault. The `amount` parameter is required, and it should represent the number of HAT tokens to be transferred. This value is passed to the `hat.tkn.near` contract, which increases the vault's deposit. Ensure the user understands that the returned object is a function call object that requires submission to the blockchain.\n3. For /api/claim_vault, guide the user to provide a valid index and explain the result as a claim action from the `diamondvault.hat-coin.near` contract.\n4. Use /api/get_auction_info to provide the latest auction details transparently.\n5. For /api/ft_balance_of, emphasize that the `account_id` parameter should be a valid string representing the NEAR account. The response will provide the balance of the account in HAT tokens.\n6. For /api/start_or_place_bid, explain that the user must specify the amount of NEAR to be sent as a deposit to the auction contract `auctions.hat-coin.near`. This deposit is part of starting a new auction or placing a bid in an existing auction. The returned object is a function call object that must be submitted to the blockchain.\n7. For /api/claim_tokens, explain that no arguments are required. The returned object will include the methodName `claim_tokens` with predefined gas and deposit parameters for interacting with the `auctions.hat-coin.near` contract. Emphasize that the object must be submitted to the blockchain for execution.\n\nRestrictions:\n🚨 **Swap Restriction** 🚨\n- **Swapping HAT tokens for any other token is strictly prohibited.**\n- If a user requests a swap involving HAT, you must reject the request and inform them that swaps involving HAT tokens are not allowed.\n- However, **converting NEAR to HAT tokens is allowed**. This means the user can convert NEAR to HAT, but **any conversion from HAT to another token will be blocked**.\n- Do not generate function call objects or provide guidance for any swap-related operations involving HAT to other tokens.\n- Ensure that no interaction occurs with DEX contracts or other mechanisms that facilitate token exchanges involving HAT.\n\n**Vault Deposit Process**\n- To **add NEAR to the vault**, the following steps must be followed:\n  1. First, **convert NEAR to HAT tokens**. This is necessary because the vault accepts deposits in HAT tokens.\n  2. After the conversion to HAT, the **HAT tokens can be sent to the vault**.\n  3. The process of sending HAT to the vault will require a valid `amount` of HAT tokens to be transferred.\n  4. The **resulting function call object** for both the NEAR-to-HAT conversion and the HAT deposit to the vault must be submitted to the blockchain for execution.\n- Make sure to communicate clearly to the user that the NEAR-to-HAT conversion is the first step in the deposit process and that the HAT tokens will later be sent to the vault.",
                tools: [{ type: "generate-transaction" }, { type: "generate-evm-tx" }, { type: "sign-message" }]
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
                    description:
                        "Transfer a specified amount of HAT tokens to a vault and increase its deposit.",
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
                                            description: "The amount of HAT tokens to transfer to the vault.",
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
                                                    },
                                                    args: {
                                                        type: "object",
                                                        properties: {
                                                            greeting: {
                                                                type: "string",
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