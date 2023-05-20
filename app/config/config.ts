import * as anchor from "@project-serum/anchor";
export const APIKEY = process.env.APIKEY as string;

export const NETWORK_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const ETH_CONTRACT_ADDRESS =
  "0xE99c5011975F86DaC57a5e5a759B07692C7a9DE2";

export const ETH_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SC_MINT_TOKEN = "0xec171F51676B62127a4BdfB145944cf8e6fDe08c";
export const ABI_MINT_TOKEN = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const WORMHOLE_ETH_SM_ADDRESS =
  "0xe52c25bc992A2E9f277fc7743139ebf566867Cb3";

export const WORMHOLE_ETH_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wormhole",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_emitterChainId",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "_emitterAddress",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_content",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "b",
        type: "bytes",
      },
    ],
    name: "bytesToUint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "consumedMessages",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedMessage",
        type: "bytes",
      },
    ],
    name: "decodeMessage",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "payloadID",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "typeHandle",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct Messages.UpdateMessage",
        name: "parsedMessage",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "emitterAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emitterChainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "payloadID",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "typeHandle",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct Messages.UpdateMessage",
        name: "parsedMessage",
        type: "tuple",
      },
    ],
    name: "encodeMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "encodedMessage",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handleMessageCustom",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handleMessageTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isSuccessSendCustomMessage",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSuccessTransferToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payload",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_vaa",
        type: "bytes",
      },
    ],
    name: "receiveMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_content",
        type: "bytes",
      },
    ],
    name: "sendData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "typeMessage",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wormhole",
    outputs: [
      {
        internalType: "contract IWormhole",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const IDL = {
  version: "0.1.0",
  name: "helloworm",
  docs: [
    "# Hello World (Scaffolding Example #1)",
    "",
    "A Cross-Chain Hello World application. This contract uses Wormhole's",
    "generic messaging to send an arbitrary message to registered emitters on",
    "foreign networks.",
    "",
    "## Program Instructions",
    "* [`initialize`](initialize)",
    "* [`register_emitter`](register_emitter)",
    "* [`send_message`](send_message)",
    "* [`receive_message`](receive_message)",
    "",
    "## Program Accounts",
    "* [Config]",
    "* [ForeignEmitter]",
    "* [Received]",
    "* [WormholeEmitter]",
  ],
  instructions: [
    {
      name: "initialize",
      docs: [
        "This instruction initializes the program config, which is meant",
        "to store data useful for other instructions. The config specifies",
        "an owner (e.g. multisig) and should be read-only for every instruction",
        "in this example. This owner will be checked for designated owner-only",
        "instructions like [`register_emitter`](register_emitter).",
        "",
        "# Arguments",
        "",
        "* `ctx` - `Initialize` context",
      ],
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
          docs: [
            "Whoever initializes the config will be the owner of the program. Signer",
            "for creating the [`Config`] account and posting a Wormhole message",
            "indicating that the program is alive.",
          ],
        },
        {
          name: "config",
          isMut: true,
          isSigner: false,
          docs: [
            "Config account, which saves program data useful for other instructions.",
            "Also saves the payer of the [`initialize`](crate::initialize) instruction",
            "as the program's owner.",
          ],
        },
        {
          name: "wormholeProgram",
          isMut: false,
          isSigner: false,
          docs: ["Wormhole program."],
        },
        {
          name: "wormholeBridge",
          isMut: true,
          isSigner: false,
          docs: [
            "Wormhole bridge data account (a.k.a. its config).",
            "[`wormhole::post_message`] requires this account be mutable.",
          ],
        },
        {
          name: "wormholeFeeCollector",
          isMut: true,
          isSigner: false,
          docs: [
            "Wormhole fee collector account, which requires lamports before the",
            "program can post a message (if there is a fee).",
            "[`wormhole::post_message`] requires this account be mutable.",
          ],
        },
        {
          name: "wormholeEmitter",
          isMut: true,
          isSigner: false,
          docs: [
            "This program's emitter account. We create this account in the",
            "[`initialize`](crate::initialize) instruction, but",
            "[`wormhole::post_message`] only needs it to be read-only.",
          ],
        },
        {
          name: "wormholeSequence",
          isMut: true,
          isSigner: false,
          docs: [
            "message is posted, so it needs to be an [UncheckedAccount] for the",
            "[`initialize`](crate::initialize) instruction.",
            "[`wormhole::post_message`] requires this account be mutable.",
          ],
        },
        {
          name: "wormholeMessage",
          isMut: true,
          isSigner: false,
          docs: [
            "account, which requires this program's signature.",
            "[`wormhole::post_message`] requires this account be mutable.",
          ],
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
          docs: ["Clock sysvar."],
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          docs: ["Rent sysvar."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["System program."],
        },
      ],
      args: [],
    },
    {
      name: "registerEmitter",
      docs: [
        "This instruction registers a new foreign emitter (from another network)",
        "and saves the emitter information in a ForeignEmitter account. This",
        "instruction is owner-only, meaning that only the owner of the program",
        "(defined in the [Config] account) can add and update emitters.",
        "",
        "# Arguments",
        "",
        "* `ctx`     - `RegisterForeignEmitter` context",
        "* `chain`   - Wormhole Chain ID",
        "* `address` - Wormhole Emitter Address",
      ],
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
          docs: [
            "Owner of the program set in the [`Config`] account. Signer for creating",
            "the [`ForeignEmitter`] account.",
          ],
        },
        {
          name: "config",
          isMut: false,
          isSigner: false,
          docs: [
            "Config account. This program requires that the `owner` specified in the",
            "context equals the pubkey specified in this account. Read-only.",
          ],
        },
        {
          name: "foreignEmitter",
          isMut: true,
          isSigner: false,
          docs: [
            "Foreign Emitter account. Create this account if an emitter has not been",
            "registered yet for this Wormhole chain ID. If there already is an",
            "emitter address saved in this account, overwrite it.",
          ],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["System program."],
        },
      ],
      args: [
        {
          name: "chain",
          type: "u16",
        },
        {
          name: "address",
          type: {
            array: ["u8", 32],
          },
        },
      ],
    },
    {
      name: "sendMessage",
      docs: [
        "This instruction posts a Wormhole message of some arbitrary size",
        "in the form of bytes ([Vec<u8>]). The message is encoded as",
        "[HelloWorldMessage::Hello], which serializes a payload ID (1) before the message",
        "specified in the instruction. Instead of using the native borsh",
        "serialization of [Vec] length (little endian u32), length of the",
        "message is encoded as big endian u16 (in EVM, bytes for numerics are",
        "natively serialized as big endian).",
        "",
        "See [HelloWorldMessage] enum for serialization implementation.",
        "",
        "# Arguments",
        "",
        "* `message` - Arbitrary message to send out",
      ],
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["Payer will pay Wormhole fee to post a message."],
        },
        {
          name: "config",
          isMut: false,
          isSigner: false,
          docs: [
            "Config account. Wormhole PDAs specified in the config are checked",
            "against the Wormhole accounts in this context. Read-only.",
          ],
        },
        {
          name: "wormholeProgram",
          isMut: false,
          isSigner: false,
          docs: ["Wormhole program."],
        },
        {
          name: "wormholeBridge",
          isMut: true,
          isSigner: false,
          docs: [
            "Wormhole bridge data. [`wormhole::post_message`] requires this account",
            "be mutable.",
          ],
        },
        {
          name: "wormholeFeeCollector",
          isMut: true,
          isSigner: false,
          docs: [
            "Wormhole fee collector. [`wormhole::post_message`] requires this",
            "account be mutable.",
          ],
        },
        {
          name: "wormholeEmitter",
          isMut: false,
          isSigner: false,
          docs: ["Program's emitter account. Read-only."],
        },
        {
          name: "wormholeSequence",
          isMut: true,
          isSigner: false,
          docs: [
            "Emitter's sequence account. [`wormhole::post_message`] requires this",
            "account be mutable.",
          ],
        },
        {
          name: "wormholeMessage",
          isMut: true,
          isSigner: false,
          docs: ["account be mutable."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["System program."],
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
          docs: ["Clock sysvar."],
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
          docs: ["Rent sysvar."],
        },
      ],
      args: [
        {
          name: "message",
          type: "bytes",
        },
      ],
    },
    {
      name: "receiveMessage",
      docs: [
        "This instruction reads a posted verified Wormhole message and verifies",
        "that the payload is of type [HelloWorldMessage::Hello] (payload ID == 1). HelloWorldMessage",
        "data is stored in a [Received] account.",
        "",
        "See [HelloWorldMessage] enum for deserialization implementation.",
        "",
        "# Arguments",
        "",
        "* `vaa_hash` - Keccak256 hash of verified Wormhole message",
      ],
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: [
            "Payer will initialize an account that tracks his own message IDs.",
          ],
        },
        {
          name: "config",
          isMut: false,
          isSigner: false,
          docs: [
            "Config account. Wormhole PDAs specified in the config are checked",
            "against the Wormhole accounts in this context. Read-only.",
          ],
        },
        {
          name: "wormholeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "posted",
          isMut: false,
          isSigner: false,
          docs: [
            "Verified Wormhole message account. The Wormhole program verified",
            "signatures and posted the account data here. Read-only.",
          ],
        },
        {
          name: "foreignEmitter",
          isMut: false,
          isSigner: false,
          docs: [
            "Foreign emitter account. The posted message's `emitter_address` must",
            "agree with the one we have registered for this message's `emitter_chain`",
            "(chain ID). Read-only.",
          ],
        },
        {
          name: "received",
          isMut: true,
          isSigner: false,
          docs: [
            "Received account. [`receive_message`](crate::receive_message) will",
            "deserialize the Wormhole message's payload and save it to this account.",
            "This account cannot be overwritten, and will prevent Wormhole message",
            "replay with the same sequence.",
          ],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["System program."],
        },
      ],
      args: [
        {
          name: "vaaHash",
          type: {
            array: ["u8", 32],
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Config",
      docs: ["Config account data."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            docs: ["Program's owner."],
            type: "publicKey",
          },
          {
            name: "wormhole",
            docs: ["Wormhole program's relevant addresses."],
            type: {
              defined: "WormholeAddresses",
            },
          },
          {
            name: "batchId",
            docs: [
              "AKA nonce. Just zero, but saving this information in this account",
              "anyway.",
            ],
            type: "u32",
          },
          {
            name: "finality",
            docs: [
              "AKA consistency level. u8 representation of Solana's",
              "[Finality](wormhole_anchor_sdk::wormhole::Finality).",
            ],
            type: "u8",
          },
        ],
      },
    },
    {
      name: "ForeignEmitter",
      docs: ["Foreign emitter account data."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "chain",
            docs: ["Emitter chain. Cannot equal `1` (Solana's Chain ID)."],
            type: "u16",
          },
          {
            name: "address",
            docs: ["Emitter address. Cannot be zero address."],
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "Received",
      docs: ["Received account."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "batchId",
            docs: [
              "AKA nonce. Should always be zero in this example, but we save it anyway.",
            ],
            type: "u32",
          },
          {
            name: "wormholeMessageHash",
            docs: ["Keccak256 hash of verified Wormhole message."],
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "message",
            docs: [
              "HelloWorldMessage from [HelloWorldMessage::Hello](crate::message::HelloWorldMessage).",
            ],
            type: "bytes",
          },
        ],
      },
    },
    {
      name: "WormholeEmitter",
      docs: ["Wormhole emitter account."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            docs: ["PDA bump."],
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "WormholeAddresses",
      docs: ["Wormhole program related addresses."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "bridge",
            docs: [
              "[BridgeData](wormhole_anchor_sdk::wormhole::BridgeData) address.",
            ],
            type: "publicKey",
          },
          {
            name: "feeCollector",
            docs: [
              "[FeeCollector](wormhole_anchor_sdk::wormhole::FeeCollector) address.",
            ],
            type: "publicKey",
          },
          {
            name: "sequence",
            docs: [
              "[SequenceTracker](wormhole_anchor_sdk::wormhole::SequenceTracker) address.",
            ],
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "HelloWorldMessage",
      docs: [
        "Expected message types for this program. Only valid payloads are:",
        "* `Alive`: Payload ID == 0. Emitted when [`initialize`](crate::initialize)",
        "is called).",
        "* `Hello`: Payload ID == 1. Emitted when",
        "[`send_message`](crate::send_message) is called).",
        "",
        "Payload IDs are encoded as u8.",
      ],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Alive",
            fields: [
              {
                name: "program_id",
                type: "publicKey",
              },
            ],
          },
          {
            name: "Hello",
            fields: [
              {
                name: "message",
                type: "bytes",
              },
            ],
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidWormholeConfig",
      msg: "InvalidWormholeConfig",
    },
    {
      code: 6001,
      name: "InvalidWormholeFeeCollector",
      msg: "InvalidWormholeFeeCollector",
    },
    {
      code: 6002,
      name: "InvalidWormholeEmitter",
      msg: "InvalidWormholeEmitter",
    },
    {
      code: 6003,
      name: "InvalidWormholeSequence",
      msg: "InvalidWormholeSequence",
    },
    {
      code: 6004,
      name: "InvalidSysvar",
      msg: "InvalidSysvar",
    },
    {
      code: 6005,
      name: "OwnerOnly",
      msg: "OwnerOnly",
    },
    {
      code: 6006,
      name: "InvalidForeignEmitter",
      msg: "InvalidForeignEmitter",
    },
    {
      code: 6007,
      name: "BumpNotFound",
      msg: "BumpNotFound",
    },
    {
      code: 6008,
      name: "InvalidMessage",
      msg: "InvalidMessage",
    },
  ],
};

export const CORE_BRIDGE_PID = new anchor.web3.PublicKey(
  "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5"
);
