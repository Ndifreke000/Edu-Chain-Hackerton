import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Bug, Layers, Server, Shield, Zap } from "lucide-react"

export default function DocumentationPage() {
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">EduChain Documentation</h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive documentation for the EduChain blockchain education platform
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: March 17, 2025</p>
      </div>

      <Tabs defaultValue="architecture">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="architecture">
            <Layers className="mr-2 h-4 w-4" />
            Architecture
          </TabsTrigger>
          <TabsTrigger value="features">
            <Zap className="mr-2 h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="smart-contracts">
            <Code className="mr-2 h-4 w-4" />
            Smart Contracts
          </TabsTrigger>
          <TabsTrigger value="limitations">
            <Bug className="mr-2 h-4 w-4" />
            Limitations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Application Architecture</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Overview</h3>
                  <p>
                    EduChain is built using a modern web architecture with Next.js as the frontend framework. The
                    application follows a client-server model with blockchain integration for certificate verification
                    and user progress tracking.
                  </p>

                  <h3>Core Components</h3>
                  <ul>
                    <li>
                      <strong>Frontend:</strong> Next.js 14 with App Router, React Server Components, and Client
                      Components
                    </li>
                    <li>
                      <strong>Styling:</strong> Tailwind CSS with shadcn/ui component library
                    </li>
                    <li>
                      <strong>State Management:</strong> React Context API and local storage for offline capabilities
                    </li>
                    <li>
                      <strong>AI Integration:</strong> Gemini API for generating quizzes, explanations, and localized
                      use cases
                    </li>
                    <li>
                      <strong>Blockchain Integration:</strong> StarkNet for certificate verification and progress
                      tracking
                    </li>
                  </ul>

                  <h3>Data Flow</h3>
                  <p>The application uses a hybrid data flow model:</p>
                  <ol>
                    <li>
                      <strong>Online Mode:</strong> Data is fetched from APIs and blockchain in real-time
                    </li>
                    <li>
                      <strong>Offline Mode:</strong> Data is stored in local storage and synchronized when connectivity
                      is restored
                    </li>
                    <li>
                      <strong>Blockchain Verification:</strong> Certificates and achievements are verified on-chain
                    </li>
                  </ol>

                  <h3>Directory Structure</h3>
                  <pre>
                    <code>{`
/app                   # Next.js App Router pages
  /api                 # API routes
  /courses             # Course pages
  /resources           # Resource pages
  /community           # Community pages
  /dashboard           # User dashboard
  /learn               # Learning interface
/components            # React components
  /ui                  # UI components
  /layout              # Layout components
  /connection          # Connection management
  /wallet              # Wallet integration
  /certificate         # Certificate components
/lib                   # Utility functions
  /gemini-api.ts       # Gemini API integration
  /utils.ts            # General utilities
/hooks                 # Custom React hooks
/public                # Static assets
                  `}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technical Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="mr-2 h-5 w-5" />
                    Frontend Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>Next.js 14:</strong> React framework with App Router
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>React 18:</strong> UI library with hooks and server components
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>Tailwind CSS:</strong> Utility-first CSS framework
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>shadcn/ui:</strong> Accessible component library
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>TypeScript:</strong> Static typing for JavaScript
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Blockchain Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>StarkNet:</strong> Layer 2 scaling solution for Ethereum
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>Cairo:</strong> Programming language for StarkNet smart contracts
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>starknet.js:</strong> JavaScript library for StarkNet interaction
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 p-1 rounded-full mr-2">•</span>
                      <span>
                        <strong>get-starknet:</strong> Wallet connection library
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="features" className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Offline Learning</CardTitle>
                  <CardDescription>Learn without internet connectivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The platform allows users to download courses and resources for offline access, addressing the
                    connectivity challenges in Northern Nigeria.
                  </p>
                  <h4 className="font-semibold mb-2">Implementation Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Uses browser's localStorage and IndexedDB for content storage</li>
                    <li>Implements service workers for offline functionality</li>
                    <li>Synchronizes progress when connectivity is restored</li>
                    <li>Provides visual indicators for downloadable content</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Multilingual Support</CardTitle>
                  <CardDescription>Content in English and Hausa</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    All educational content is available in both English and Hausa to improve accessibility for learners
                    in Northern Nigeria.
                  </p>
                  <h4 className="font-semibold mb-2">Implementation Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Language toggle component for switching between languages</li>
                    <li>Translation API integration for dynamic content</li>
                    <li>Pre-translated static content for core materials</li>
                    <li>Language preference saved in user settings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Certificates</CardTitle>
                  <CardDescription>Verifiable credentials on StarkNet</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learners receive blockchain-verified certificates upon course completion, providing tamper-proof
                    credentials.
                  </p>
                  <h4 className="font-semibold mb-2">Implementation Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Certificate data stored on StarkNet blockchain</li>
                    <li>Unique certificate IDs with verification links</li>
                    <li>QR codes for easy verification</li>
                    <li>Downloadable and shareable certificate formats</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Learning</CardTitle>
                  <CardDescription>Personalized learning with Gemini API</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The platform uses AI to generate quizzes, provide explanations, and create localized use cases
                    relevant to Northern Nigeria.
                  </p>
                  <h4 className="font-semibold mb-2">Implementation Details:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Gemini API integration for content generation</li>
                    <li>Contextual explanations based on user questions</li>
                    <li>Industry-specific blockchain use cases</li>
                    <li>Adaptive quiz difficulty based on user performance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User Flows</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Learning Journey</h3>
                  <ol>
                    <li>User browses available courses on the platform</li>
                    <li>User enrolls in a course (with or without wallet connection)</li>
                    <li>User downloads course content for offline access (optional)</li>
                    <li>User progresses through course modules and completes quizzes</li>
                    <li>User receives a blockchain-verified certificate upon completion</li>
                  </ol>

                  <h3>Wallet Integration</h3>
                  <ol>
                    <li>User clicks "Connect Wallet" button in the header</li>
                    <li>User selects a wallet provider (Argent X, Braavos, etc.)</li>
                    <li>User approves the connection request</li>
                    <li>Platform stores wallet address and associates it with user data</li>
                    <li>User can now access blockchain features (certificates, progress tracking)</li>
                  </ol>

                  <h3>Offline Synchronization</h3>
                  <ol>
                    <li>User downloads content while online</li>
                    <li>User continues learning when offline</li>
                    <li>Progress is stored locally on the device</li>
                    <li>When connectivity is restored, user clicks "Sync" button</li>
                    <li>Local progress is synchronized with the server and blockchain</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="smart-contracts" className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Smart Contract Integration</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Overview</h3>
                  <p>
                    EduChain uses StarkNet smart contracts to verify certificates, track user progress, and manage
                    educational credentials. The contracts are written in Cairo, a programming language designed for
                    StarkNet's STARK-based proving system.
                  </p>

                  <h3>Contract Architecture</h3>
                  <p>The smart contract system consists of the following components:</p>
                  <ul>
                    <li>
                      <strong>CertificateRegistry:</strong> Stores and verifies educational certificates
                    </li>
                    <li>
                      <strong>ProgressTracker:</strong> Tracks user progress across courses
                    </li>
                    <li>
                      <strong>UserRegistry:</strong> Manages user identities and permissions
                    </li>
                  </ul>

                  <h3>Certificate Registry Contract</h3>
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

                  <h3>Integration Steps</h3>
                  <p>To integrate the smart contracts with the EduChain platform, follow these steps:</p>
                  <ol>
                    <li>
                      <strong>Deploy Contracts:</strong> Deploy the smart contracts to StarkNet using Starknet CLI or
                      Hardhat
                    </li>
                    <li>
                      <strong>Configure Frontend:</strong> Update the frontend configuration with contract addresses
                    </li>
                    <li>
                      <strong>Connect Wallet:</strong> Implement wallet connection using get-starknet library
                    </li>
                    <li>
                      <strong>Interact with Contracts:</strong> Use starknet.js to interact with the deployed contracts
                    </li>
                  </ol>

                  <h3>Contract Interaction Example</h3>
                  <pre>
                    <code>{`
import { connect } from 'get-starknet'
import { Contract, Provider } from 'starknet'
import { certificateAbi } from './abis/certificate-abi'

// Connect to wallet
const connectWallet = async () => {
  try {
    const starknet = await connect()
    if (!starknet) throw new Error('Failed to connect to StarkNet')
    
    await starknet.enable()
    const [address] = starknet.selectedAddress
    
    return { starknet, address }
  } catch (error) {
    console.error('Error connecting to wallet:', error)
    throw error
  }
}

// Verify certificate
const verifyCertificate = async (certificateId) => {
  const { starknet } = await connectWallet()
  
  const provider = new Provider({ sequencer: { network: 'goerli-alpha' } })
  const contract = new Contract(
    certificateAbi,
    process.env.CERTIFICATE_CONTRACT_ADDRESS,
    provider
  )
  
  const result = await contract.verify_certificate(certificateId)
  
  if (result.exists.toNumber() === 0) {
    return { verified: false }
  }
  
  return {
    verified: true,
    studentAddress: result.student_address,
    courseId: result.course_id.toNumber(),
    timestamp: result.timestamp.toNumber(),
    instructorId: result.instructor_id.toNumber(),
    metadataUri: result.metadata_uri
  }
}
                  `}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="limitations" className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Current Limitations and Future Work</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Technical Limitations</h3>
                  <ul>
                    <li>
                      <strong>Offline Storage Capacity:</strong> Browser storage limitations may restrict the amount of
                      content that can be stored offline
                    </li>
                    <li>
                      <strong>AI Generation Costs:</strong> Generating content with Gemini API incurs costs that scale
                      with usage
                    </li>
                    <li>
                      <strong>StarkNet Transaction Fees:</strong> While lower than Ethereum, transaction fees still
                      present a barrier for some users
                    </li>
                    <li>
                      <strong>Mobile Performance:</strong> Complex UI components may cause performance issues on low-end
                      mobile devices
                    </li>
                  </ul>

                  <h3>Content Limitations</h3>
                  <ul>
                    <li>
                      <strong>Video Content:</strong> Limited support for video content in offline mode due to storage
                      constraints
                    </li>
                    <li>
                      <strong>Interactive Exercises:</strong> Complex interactive exercises require online connectivity
                    </li>
                    <li>
                      <strong>Translation Quality:</strong> Automated translations may not capture nuances of technical
                      blockchain terminology
                    </li>
                  </ul>

                  <h3>Future Improvements</h3>
                  <ul>
                    <li>
                      <strong>Progressive Web App (PWA):</strong> Implement full PWA capabilities for improved offline
                      experience
                    </li>
                    <li>
                      <strong>Peer-to-Peer Sharing:</strong> Enable content sharing between devices without internet
                      connectivity
                    </li>
                    <li>
                      <strong>Improved Compression:</strong> Implement better compression algorithms for offline content
                    </li>
                    <li>
                      <strong>Community Contributions:</strong> Allow community members to contribute and verify
                      educational content
                    </li>
                    <li>
                      <strong>Mobile App:</strong> Develop native mobile applications for Android and iOS
                    </li>
                    <li>
                      <strong>Enhanced Analytics:</strong> Implement better tracking of user progress and learning
                      outcomes
                    </li>
                  </ul>

                  <h3>Known Issues</h3>
                  <ul>
                    <li>
                      <strong>Wallet Connection:</strong> Occasional disconnection issues with some wallet providers
                    </li>
                    <li>
                      <strong>Synchronization Conflicts:</strong> Potential conflicts when synchronizing offline
                      progress
                    </li>
                    <li>
                      <strong>Certificate Verification:</strong> Delays in certificate verification during network
                      congestion
                    </li>
                    <li>
                      <strong>Language Toggle:</strong> Some UI elements may not properly update when switching
                      languages
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Q2 2025</h3>
                  <ul>
                    <li>Implement full Progressive Web App (PWA) capabilities</li>
                    <li>Enhance offline content management</li>
                    <li>Improve wallet connection stability</li>
                    <li>Add more courses focused on agricultural applications</li>
                  </ul>

                  <h3>Q3 2025</h3>
                  <ul>
                    <li>Launch peer-to-peer content sharing</li>
                    <li>Implement community contribution system</li>
                    <li>Expand language support to include more regional languages</li>
                    <li>Develop advanced certificate verification system</li>
                  </ul>

                  <h3>Q4 2025</h3>
                  <ul>
                    <li>Release native mobile applications</li>
                    <li>Implement decentralized identity system</li>
                    <li>Launch community governance for content curation</li>
                    <li>Integrate with additional blockchain networks</li>
                  </ul>

                  <h3>Q1 2026</h3>
                  <ul>
                    <li>Implement advanced analytics and learning outcomes tracking</li>
                    <li>Launch decentralized job marketplace</li>
                    <li>Develop blockchain-based microcredentials system</li>
                    <li>Expand to additional regions in Africa</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

