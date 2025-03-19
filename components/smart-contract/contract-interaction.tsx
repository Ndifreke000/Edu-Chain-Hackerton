"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWallet } from "@/components/wallet/wallet-provider"
import { AlertCircle, Check, Copy, Code } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContractInteractionProps {
  contractAddress?: string
  contractABI?: string
}

export function ContractInteraction({ contractAddress, contractABI }: ContractInteractionProps) {
  const { connected, address } = useWallet()
  const [customAddress, setCustomAddress] = useState(contractAddress || "")
  const [customABI, setCustomABI] = useState(contractABI || "")
  const [functionName, setFunctionName] = useState("")
  const [functionArgs, setFunctionArgs] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInteraction = async () => {
    if (!connected) {
      setError("Please connect your wallet first")
      return
    }

    if (!customAddress) {
      setError("Contract address is required")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // In a real implementation, this would use a library like starknet.js
      // to interact with the contract

      // Simulate contract interaction with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful result
      setResult(
        JSON.stringify(
          {
            status: "success",
            data: {
              value: "0x123456789abcdef",
              decoded: "Sample result from contract call",
            },
            txHash: "0x7890abcdef1234567890abcdef123456789012345678901234567890abcdef12",
          },
          null,
          2,
        ),
      )
    } catch (err) {
      setError("Failed to interact with contract: " + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Smart Contract Interaction
        </CardTitle>
        <CardDescription>Interact with smart contracts on StarkNet for educational purposes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="interact" className="space-y-4">
          <TabsList>
            <TabsTrigger value="interact">Interact</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contract-address">Contract Address</Label>
              <Input
                id="contract-address"
                placeholder="0x..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract-abi">Contract ABI (JSON)</Label>
              <Textarea
                id="contract-abi"
                placeholder="[{...}]"
                value={customABI}
                onChange={(e) => setCustomABI(e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="interact" className="space-y-4">
            {!connected && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Wallet not connected</AlertTitle>
                <AlertDescription>You need to connect your wallet to interact with smart contracts.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="function-name">Function Name</Label>
              <Input
                id="function-name"
                placeholder="e.g. balanceOf"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="function-args">Function Arguments (JSON)</Label>
              <Textarea
                id="function-args"
                placeholder='e.g. ["0x123...", "100"]'
                value={functionArgs}
                onChange={(e) => setFunctionArgs(e.target.value)}
                className="min-h-[80px] font-mono text-sm"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="relative rounded-md bg-muted p-4">
                <div className="absolute right-2 top-2">
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(result)} className="h-6 w-6">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-xs overflow-auto max-h-[200px]">{result}</pre>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={loading}>
          Clear
        </Button>
        <Button onClick={handleInteraction} disabled={loading || !connected}>
          {loading ? "Processing..." : "Execute"}
        </Button>
      </CardFooter>
    </Card>
  )
}

