"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContractInteraction } from "@/components/smart-contract/contract-interaction"
import { DynamicLogo } from "@/components/ui/dynamic-logo"
import { Code, BookOpen, Lightbulb } from "lucide-react"

export default function PlaygroundPage() {
  const [selectedContract, setSelectedContract] = useState<string | null>(null)

  // Sample educational contracts
  const educationalContracts = [
    {
      id: "erc20",
      name: "ERC-20 Token",
      description: "A simple ERC-20 token contract for learning token standards",
      address: "0x1234567890abcdef1234567890abcdef12345678",
      abi: JSON.stringify([
        {
          name: "balanceOf",
          type: "function",
          inputs: [{ name: "account", type: "felt" }],
          outputs: [{ name: "balance", type: "felt" }],
        },
      ]),
    },
    {
      id: "nft",
      name: "Simple NFT",
      description: "A basic NFT contract to learn about non-fungible tokens",
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      abi: JSON.stringify([
        {
          name: "ownerOf",
          type: "function",
          inputs: [{ name: "tokenId", type: "felt" }],
          outputs: [{ name: "owner", type: "felt" }],
        },
      ]),
    },
    {
      id: "voting",
      name: "Voting System",
      description: "A simple voting system to learn about decentralized governance",
      address: "0x7890abcdef1234567890abcdef1234567890abcd",
      abi: JSON.stringify([
        {
          name: "getVotes",
          type: "function",
          inputs: [{ name: "proposalId", type: "felt" }],
          outputs: [{ name: "votes", type: "felt" }],
        },
      ]),
    },
  ]

  const selectedContractData = selectedContract ? educationalContracts.find((c) => c.id === selectedContract) : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Smart Contract Playground</h1>
            <p className="text-muted-foreground">Learn by interacting with educational smart contracts on StarkNet</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Educational Contracts
                  </CardTitle>
                  <CardDescription>Pre-configured contracts for learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {educationalContracts.map((contract) => (
                      <div
                        key={contract.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedContract === contract.id ? "bg-primary/10 border-primary/50" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedContract(contract.id)}
                      >
                        <DynamicLogo
                          text={contract.name}
                          size="md"
                          variant={selectedContract === contract.id ? "primary" : "muted"}
                          seed={contract.id.charCodeAt(0)}
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium">{contract.name}</h4>
                          <p className="text-xs text-muted-foreground">{contract.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Learning Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <p>
                      <strong>What is a smart contract?</strong> A smart contract is a self-executing program stored on
                      a blockchain that runs when predetermined conditions are met.
                    </p>
                    <p>
                      <strong>Function calls</strong> allow you to read data from a contract without changing its state.
                    </p>
                    <p>
                      <strong>Transactions</strong> modify the contract's state and require gas fees to execute.
                    </p>
                    <p>
                      <strong>ABI (Application Binary Interface)</strong> defines how to interact with the contract,
                      including function names and parameter types.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="interact" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="interact" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Contract Interaction
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="interact">
                  {selectedContractData ? (
                    <ContractInteraction
                      contractAddress={selectedContractData.address}
                      contractABI={selectedContractData.abi}
                    />
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Select a contract from the list to begin interacting</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

