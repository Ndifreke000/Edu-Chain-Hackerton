import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function SmartContractsGuidePage() {
  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Smart Contract Integration Guide</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive guide to creating and integrating smart contracts with the EduChain platform
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: March 17, 2025</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Architecture</CardTitle>
              <CardDescription>Overview of the EduChain smart contract system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <h3>Contract System Overview</h3>
                <p>
                  The EduChain platform uses a system of smart contracts deployed on StarkNet to manage educational
                  credentials, track user progress, and verify certificates. The contracts are written in Cairo, a
                  programming language designed for StarkNet's STARK-based proving system.
                </p>

                <h3>Core Contracts</h3>
                <ul>
                  <li>
                    <strong>CertificateRegistry:</strong> Manages the issuance and verification of educational
                    certificates
                  </li>
                  <li>
                    <strong>ProgressTracker:</strong> Tracks user progress across courses and modules
                  </li>
                  <li>
                    <strong>UserRegistry:</strong> Manages user identities and permissions
                  </li>
                </ul>

                <h3>Contract Relationships</h3>
                <p>
                  The contracts interact with each other to provide a complete system for managing educational
                  credentials:
                </p>
                <ul>
                  <li>The UserRegistry maintains a list of registered users and their roles</li>
                  <li>The ProgressTracker records user progress and completion of courses</li>
                  <li>The CertificateRegistry issues certificates when users complete courses</li>
                </ul>

                <h3>Data Flow</h3>
                <ol>
                  <li>User registers and connects wallet (UserRegistry)</li>
                  <li>User enrolls in courses and completes modules (ProgressTracker)</li>
                  <li>Upon course completion, a certificate is issued (CertificateRegistry)</li>
                  <li>Certificates can be verified by third parties (CertificateRegistry)</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Development</CardTitle>
              <CardDescription>Guide to developing smart contracts for EduChain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <h3>Development Environment Setup</h3>
                <p>
                  To develop smart contracts for the EduChain platform, you'll need to set up a Cairo development
                  environment:
                </p>
                <pre>
                  <code>{`
# Install Cairo compiler
curl -L https://github.com/starkware-libs/cairo/releases/download/v1.0.0-alpha.6/cairo-1.0.0-alpha.6-x86_64-unknown-linux-gnu.tar.gz | tar xz
export PATH="$PATH:$(pwd)/cairo-1.0.0-alpha.6/bin"

# Install Scarb (Cairo package manager)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Install StarkNet CLI
pip install starknet-devnet
                `}</code>
                </pre>

                <h3>Certificate Registry Contract</h3>
                <p>Here's the implementation of the CertificateRegistry contract:</p>
                <pre>
                  <code>{`
// SPDX-License-Identifier: MIT
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256
from starkware.starknet.common.syscalls import get_caller_address

struct Certificate {
    student_address: felt,
    course_id: felt,
    timestamp: felt,
    instructor_id: felt,
    metadata_uri: felt,
}

@storage_var
func certificates(certificate_id: felt) -> (certificate: Certificate) {
}

@storage_var
func user_certificates(address: felt, index: felt) -> (certificate_id: felt) {
}

@storage_var
func user_certificate_count(address: felt) -> (count: felt) {
}

@storage_var
func admin() -> (address: felt) {
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(admin_address: felt) {
    admin.write(admin_address);
    return ();
}

@external
func issue_certificate{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    certificate_id: felt,
    student_address: felt,
    course_id: felt,
    timestamp: felt,
    instructor_id: felt,
    metadata_uri: felt
) {
    let (caller) = get_caller_address();
    let (admin_address) = admin.read();
    assert caller = admin_address;

    let certificate = Certificate(
        student_address=student_address,
        course_id=course_id,
        timestamp=timestamp,
        instructor_id=instructor_id,
        metadata_uri=metadata_uri
    );
    
    certificates.write(certificate_id, certificate);
    
    let (count) = user_certificate_count.read(student_address);
    user_certificates.write(student_address, count, certificate_id);
    user_certificate_count.write(student_address, count + 1);
    
    return ();
}

@view
func verify_certificate{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    certificate_id: felt
) -> (
    exists: felt,
    student_address: felt,
    course_id: felt,
    timestamp: felt,
    instructor_id: felt,
    metadata_uri: felt
) {
    let (certificate) = certificates.read(certificate_id);
    
    if (certificate.student_address == 0) {
        return (0, 0, 0, 0, 0, 0);
    }
    
    return (
        1,
        certificate.student_address,
        certificate.course_id,
        certificate.timestamp,
        certificate.instructor_id,
        certificate.metadata_uri
    );
}

@view
func get_user_certificates{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    address: felt
) -> (count: felt) {
    let (count) = user_certificate_count.read(address);
    return (count,);
}

@view
func get_user_certificate_by_index{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    address: felt, index: felt
) -> (certificate_id: felt) {
    let (certificate_id) = user_certificates.read(address, index);
    return (certificate_id,);
}
                `}</code>
                </pre>

                <h3>Progress Tracker Contract</h3>
                <p>Here's the implementation of the ProgressTracker contract:</p>
                <pre>
                  <code>{`
// SPDX-License-Identifier: MIT
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address

struct Progress {
    user_address: felt,
    course_id: felt,
    module_id: felt,
    completed: felt,
    score: felt,
    timestamp: felt,
}

@storage_var
func user_progress(user_address: felt, course_id: felt, module_id: felt) -> (progress: Progress) {
}

@storage_var
func course_completion(user_address: felt, course_id: felt) -> (completed: felt) {
}

@storage_var
func admin() -> (address: felt) {
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(admin_address: felt) {
    admin.write(admin_address);
    return ();
}

@external
func update_progress{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user_address: felt,
    course_id: felt,
    module_id: felt,
    completed: felt,
    score: felt,
    timestamp: felt
) {
    let (caller) = get_caller_address();
    let (admin_address) = admin.read();
    assert caller = admin_address;

    let progress = Progress(
        user_address=user_address,
        course_id=course_id,
        module_id=module_id,
        completed=completed,
        score=score,
        timestamp=timestamp
    );
    
    user_progress.write(user_address, course_id, module_id, progress);
    
    return ();
}

@external
func mark_course_completed{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user_address: felt,
    course_id: felt
) {
    let (caller) = get_caller_address();
    let (admin_address) = admin.read();
    assert caller = admin_address;
    
    course_completion.write(user_address, course_id, 1);
    
    return ();
}

@view
func get_progress{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user_address: felt,
    course_id: felt,
    module_id: felt
) -> (
    completed: felt,
    score: felt,
    timestamp: felt
) {
    let (progress) = user_progress.read(user_address, course_id, module_id);
    
    return (
        progress.completed,
        progress.score,
        progress.timestamp
    );
}

@view
func is_course_completed{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user_address: felt,
    course_id: felt
) -> (completed: felt) {
    let (completed) = course_completion.read(user_address, course_id);
    return (completed,);
}
                `}</code>
                </pre>

                <h3>Testing Smart Contracts</h3>
                <p>You can test your smart contracts using the StarkNet devnet and pytest:</p>
                <pre>
                  <code>{`
# Start StarkNet devnet
starknet-devnet --seed 0

# Run tests
pytest -xvs tests/test_certificate_registry.py
                `}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Deployment</CardTitle>
              <CardDescription>Guide to deploying smart contracts on StarkNet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <h3>Compiling Contracts</h3>
                <p>Before deploying, you need to compile your Cairo contracts:</p>
                <pre>
                  <code>{`
# Compile Cairo contract
starknet-compile certificate_registry.cairo --output certificate_registry_compiled.json --abi certificate_registry_abi.json
                `}</code>
                </pre>

                <h3>Deploying to StarkNet Testnet</h3>
                <p>Deploy your contracts to the StarkNet Goerli testnet:</p>
                <pre>
                  <code>{`
# Deploy to StarkNet Goerli testnet
starknet deploy --contract certificate_registry_compiled.json --network alpha-goerli --inputs 0x123456 # Admin address
                `}</code>
                </pre>

                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-md my-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Important Note</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Make sure to save the contract address returned after deployment. You'll need it for frontend
                        integration.
                      </p>
                    </div>
                  </div>
                </div>

                <h3>Verifying Deployment</h3>
                <p>Verify that your contract was deployed successfully:</p>
                <pre>
                  <code>{`
# Check contract on StarkScan
https://goerli.voyager.online/contract/0x123456789abcdef
                `}</code>
                </pre>

                <h3>Deploying to StarkNet Mainnet</h3>
                <p>Once you've tested your contracts on the testnet, you can deploy to mainnet:</p>
                <pre>
                  <code>{`
# Deploy to StarkNet mainnet
starknet deploy --contract certificate_registry_compiled.json --network alpha-mainnet --inputs 0x123456 # Admin address
                `}</code>
                </pre>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-md my-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300">Deployment Costs</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Deploying to StarkNet mainnet requires ETH to pay for transaction fees. Make sure you have
                        enough ETH in your deployer account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Integration</CardTitle>
              <CardDescription>Guide to integrating smart contracts with the EduChain frontend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <h3>Setting Up Contract ABIs</h3>
                <p>First, create a directory for your contract ABIs and add the compiled ABI files:</p>
                <pre>
                  <code>{`
// lib/contracts/abis/certificate-registry-abi.json
[
  {
    "inputs": [
      {
        "name": "admin_address",
        "type": "felt"
      }
    ],
    "name": "constructor",
    "outputs": [],
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "name": "certificate_id",
        "type": "felt"
      },
      {
        "name": "student_address",
        "type": "felt"
      },
      {
        "name": "course_id",
        "type": "felt"
      },
      {
        "name": "timestamp",
        "type": "felt"
      },
      {
        "name": "instructor_id",
        "type": "felt"
      },
      {
        "name": "metadata_uri",
        "type": "felt"
      }
    ],
    "name": "issue_certificate",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "certificate_id",
        "type": "felt"
      }
    ],
    "name": "verify_certificate",
    "outputs": [
      {
        "name": "exists",
        "type": "felt"
      },
      {
        "name": "student_address",
        "type": "felt"
      },
      {
        "name": "course_id",
        "type": "felt"
      },
      {
        "name": "timestamp",
        "type": "felt"
      },
      {
        "name": "instructor_id",
        "type": "felt"
      },
      {
        "name": "metadata_uri",
        "type": "felt"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "address",
        "type": "felt"
      }
    ],
    "name": "get_user_certificates",
    "outputs": [
      {
        "name": "count",
        "type": "felt"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "address",
        "type": "felt"
      },
      {
        "name": "index",
        "type": "felt"
      }
    ],
    "name": "get_user_certificate_by_index",
    "outputs": [
      {
        "name": "certificate_id",
        "type": "felt"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
                `}</code>
                </pre>

                <h3>Creating Contract Interaction Utilities</h3>
                <p>Create utility functions to interact with your smart contracts:</p>
                <pre>
                  <code>{`
// lib/contracts/certificate-registry.ts
import { Contract, Provider, constants } from 'starknet'
import certificateRegistryAbi from './abis/certificate-registry-abi.json'

// Contract addresses
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CERTIFICATE_REGISTRY_ADDRESS || ''

// Create provider
const provider = new Provider({
  sequencer: {
    network: process.env.NEXT_PUBLIC_STARKNET_NETWORK === 'mainnet' 
      ? constants.NetworkName.SN_MAIN 
      : constants.NetworkName.SN_GOERLI
  }
})

// Create contract instance
export const getCertificateRegistryContract = () => {
  return new Contract(certificateRegistryAbi, CONTRACT_ADDRESS, provider)
}

// Verify certificate
export const verifyCertificate = async (certificateId: string) => {
  try {
    const contract = getCertificateRegistryContract()
    const result = await contract.verify_certificate(certificateId)
    
    if (result.exists.toString() === '0') {
      return { verified: false }
    }
    
    return {
      verified: true,
      studentAddress: result.student_address.toString(),
      courseId: result.course_id.toString(),
      timestamp: result.timestamp.toString(),
      instructorId: result.instructor_id.toString(),
      metadataUri: result.metadata_uri.toString()
    }
  } catch (error) {
    console.error('Error verifying certificate:', error)
    throw error
  }
}

// Get user certificates
export const getUserCertificates = async (address: string) => {
  try {
    const contract = getCertificateRegistryContract()
    const result = await contract.get_user_certificates(address)
    const count = parseInt(result.count.toString())
    
    const certificates = []
    for (let i = 0; i < count; i++) {
      const certIdResult = await contract.get_user_certificate_by_index(address, i)
      const certificateId = certIdResult.certificate_id.toString()
      const certificate = await verifyCertificate(certificateId)
      if (certificate.verified) {
        certificates.push({
          id: certificateId,
          ...certificate
        })
      }
    }
    
    return certificates
  } catch (error) {
    console.error('Error getting user certificates:', error)
    throw error
  }
}
                `}</code>
                </pre>

                <h3>Wallet Connection Integration</h3>
                <p>Update the wallet connection component to interact with StarkNet:</p>
                <pre>
                  <code>{`
// components/wallet/wallet-provider.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { connect, disconnect as disconnectWallet } from 'get-starknet'
import { constants } from 'starknet'

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {}
})

const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async () => {
    try {
      setIsConnecting(true)
      const starknet = await connect({
        modalMode: 'alwaysAsk',
        modalTheme: 'dark',
      })
      
      if (!starknet) {
        throw new Error('Failed to connect to StarkNet')
      }
      
      await starknet.enable()
      const userAddress = starknet.selectedAddress
      
      setAddress(userAddress)
      setIsConnected(true)
      
      // Save connection info to localStorage
      localStorage.setItem('wallet_connected', 'true')
      localStorage.setItem('wallet_address', userAddress)
    } catch (error) {
      console.error('Error connecting to wallet:', error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    disconnectWallet()
    setAddress(null)
    setIsConnected(false)
    
    // Clear localStorage
    localStorage.removeItem('wallet_connected')
    localStorage.removeItem('wallet_address')
  }

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = localStorage.getItem('wallet_connected') === 'true'
      const savedAddress = localStorage.getItem('wallet_address')
      
      if (connected && savedAddress) {
        setAddress(savedAddress)
        setIsConnected(true)
      }
    }
    
    checkConnection()
  }, [])

  return (
    <WalletContext.Provider value={{ address, isConnected, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }
                `}</code>
                </pre>

                <h3>Certificate Verification Component</h3>
                <p>Create a component to verify certificates on the blockchain:</p>
                <pre>
                  <code>{`
// components/certificate/certificate-verification.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, XCircle, Search, Loader2 } from 'lucide-react'
import { verifyCertificate } from '@/lib/contracts/certificate-registry'

export function CertificateVerification() {
  const [certificateId, setCertificateId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    if (!certificateId) return
    
    setIsVerifying(true)
    setError(null)
    setVerificationResult(null)
    
    try {
      const result = await verifyCertificate(certificateId)
      setVerificationResult(result)
    } catch (err) {
      console.error('Verification error:', err)
      setError('Failed to verify certificate. Please check the certificate ID and try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Certificate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleVerify} disabled={!certificateId || isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          {verificationResult && (
            <div className="p-4 border rounded-md">
              {verificationResult.verified ? (
                <div className="space-y-4">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <span className="font-medium">Certificate Verified</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Student Address:</span>{' '}
                      {verificationResult.studentAddress}
                    </div>
                    <div>
                      <span className="font-medium">Course ID:</span>{' '}
                      {verificationResult.courseId}
                    </div>
                    <div>
                      <span className="font-medium">Issue Date:</span>{' '}
                      {new Date(parseInt(verificationResult.timestamp) * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-destructive">
                  <XCircle className="mr-2 h-5 w-5" />
                  <span className="font-medium">Certificate Not Found</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
                `}</code>
                </pre>

                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-md my-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Integration Complete</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        You've successfully integrated the smart contracts with the EduChain frontend. Users can now
                        verify certificates on the blockchain and track their progress.
                      </p>
                    </div>
                  </div>
                </div>

                <h3>Next Steps</h3>
                <p>Now that you've integrated the smart contracts with the frontend, you can:</p>
                <ul>
                  <li>Add certificate issuance functionality for course completion</li>
                  <li>Implement progress tracking for course modules</li>
                  <li>Create an admin interface for managing certificates</li>
                  <li>Add batch verification for multiple certificates</li>
                </ul>

                <p>For more information on StarkNet development, check out the following resources:</p>
                <ul>
                  <li>
                    <a href="https://docs.starknet.io/" target="_blank" rel="noopener noreferrer">
                      StarkNet Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://cairo-lang.org/" target="_blank" rel="noopener noreferrer">
                      Cairo Programming Language
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/starknet-edu" target="_blank" rel="noopener noreferrer">
                      StarkNet Educational Resources
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Link href="/documentation" className="flex items-center text-primary hover:underline">
          Back to Documentation <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

