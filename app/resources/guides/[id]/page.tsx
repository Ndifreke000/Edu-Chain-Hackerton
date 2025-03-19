"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Bookmark, Share2, CheckCircle, Languages, ArrowRight, ArrowDown } from "lucide-react"
import { useConnection } from "@/components/connection/connection-provider"
import { useToast } from "@/components/ui/use-toast"
import { LanguageToggle } from "@/components/language-toggle"

export default function GuidePage() {
  const params = useParams()
  const guideId = params.id as string
  const { isOnline } = useConnection()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [language, setLanguage] = useState<"english" | "hausa">("english")

  // Mock guide data - in a real app, you would fetch this based on the ID
  const guide = {
    id: guideId,
    title: "Setting Up Your First Cryptocurrency Wallet",
    titleHausa: "Samar da Wallet Ɗin Cryptocurrency na Farko",
    description: "A step-by-step guide to creating and securing your first cryptocurrency wallet",
    descriptionHausa: "Jagora matakin-bayan-mataki don ƙirƙirar da kuma tsare wallet ɗin cryptocurrency na farko",
    difficulty: "Beginner",
    language: "English/Hausa",
    author: "Amina Yusuf",
    lastUpdated: "May 15, 2024",
    downloadable: true,
    steps: [
      {
        number: 1,
        title: "Understanding Cryptocurrency Wallets",
        titleHausa: "Fahimtar Wallet Ɗin Cryptocurrency",
        content:
          "A cryptocurrency wallet is a digital tool that allows you to store, send, and receive digital currencies. Unlike traditional wallets, crypto wallets don't actually store your coins. Instead, they store the private keys that give you access to your cryptocurrency on the blockchain.\n\nThere are several types of cryptocurrency wallets:\n\n- **Hot Wallets**: Connected to the internet (mobile apps, desktop software, web wallets)\n- **Cold Wallets**: Not connected to the internet (hardware wallets, paper wallets)\n\nFor beginners in Northern Nigeria, we recommend starting with a mobile wallet as they are easy to use and accessible to anyone with a smartphone.",
        contentHausa:
          "Wallet ɗin cryptocurrency wani kayan aiki ne na dijital wanda ke ba ka damar adana, aika, da karɓar kuɗin dijital. Ba kamar wallet na gargajiya ba, wallet na crypto ba su adana kuɗin ba. Maimakon haka, suna adana maɓallan sirri waɗanda ke ba ka damar shiga cryptocurrency ɗinka a kan blockchain.\n\nAkwai ire-iren wallet ɗin cryptocurrency da dama:\n\n- **Hot Wallets**: Haɗe da yanar gizo (manhajar wayar hannu, manhajar kwamfuta, wallet na yanar gizo)\n- **Cold Wallets**: Ba a haɗa su da yanar gizo ba (wallet na kayan aiki, wallet na takarda)\n\nDon masu fara koyo a Arewacin Najeriya, muna ba da shawarar fara da wallet na wayar hannu saboda suna da sauƙin amfani kuma kowa da ke da wayar hannu na iya amfani da su.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Different types of cryptocurrency wallets",
        imageCaptionHausa: "Ire-iren wallet ɗin cryptocurrency daban-daban",
      },
      {
        number: 2,
        title: "Choosing the Right Wallet",
        titleHausa: "Zaɓar Wallet Ɗin da Ya Dace",
        content:
          "When selecting a wallet, consider these factors:\n\n- **Security**: Look for wallets with strong security features like two-factor authentication and biometric login.\n- **Ease of use**: As a beginner, choose a wallet with a simple, intuitive interface.\n- **Supported cryptocurrencies**: Make sure the wallet supports the cryptocurrencies you plan to use.\n- **Backup options**: The wallet should allow you to backup your private keys or recovery phrase.\n- **Offline functionality**: Important for areas with limited internet connectivity.\n\nRecommended mobile wallets for beginners in Northern Nigeria include Trust Wallet and Coinomi, as they support multiple cryptocurrencies, have user-friendly interfaces, and work well in areas with intermittent internet connectivity.",
        contentHausa:
          "Lokacin da kake zaɓar wallet, ka yi la'akari da waɗannan abubuwa:\n\n- **Tsaro**: Nemi wallet da ke da ƙarfin tsaro kamar tantancewar biyu da shiga ta hanyar biometric.\n- **Sauƙin amfani**: A matsayin mai fara koyo, zaɓi wallet da ke da sauƙin amfani, da ke da haɗin kai mai sauƙi.\n- **Cryptocurrencies da ake goyon baya**: Tabbatar cewa wallet ɗin yana goyon bayan cryptocurrencies da kake shirin amfani da su.\n- **Zaɓuɓɓukan adana**: Wallet ɗin ya kamata ya ba ka damar adana maɓallan sirri ko jumlar dawo da su.\n- **Aiki ba tare da haɗi ba**: Muhimmi ne ga wuraren da ba su da isasshen haɗin yanar gizo.\n\nWallet ɗin wayar hannu da ake ba da shawarar ga masu fara koyo a Arewacin Najeriya sun haɗa da Trust Wallet da Coinomi, saboda suna goyon bayan cryptocurrencies da yawa, suna da haɗin kai mai sauƙin amfani, kuma suna aiki sosai a wuraren da haɗin yanar gizo ba shi da ƙarfi.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Comparison of popular mobile cryptocurrency wallets",
        imageCaptionHausa: "Kwatancin wallet ɗin cryptocurrency na wayar hannu da aka fi so",
      },
      {
        number: 3,
        title: "Downloading and Installing Your Wallet",
        titleHausa: "Sauke da Shigar da Wallet Ɗinka",
        content:
          "Follow these steps to download and install your wallet:\n\n1. Visit your device's app store (Google Play Store for Android or App Store for iOS).\n2. Search for the wallet you've chosen (e.g., Trust Wallet).\n3. Download and install the application.\n4. Open the app once installation is complete.\n\nMake sure you only download wallet apps from official sources to avoid scams and fake applications. Check the developer name, reviews, and number of downloads to verify authenticity.",
        contentHausa:
          "Bi waɗannan matakai don sauke da shigar da wallet ɗinka:\n\n1. Ziyarci app store na na'urarka (Google Play Store don Android ko App Store don iOS).\n2. Nemi wallet ɗin da ka zaɓa (misali, Trust Wallet).\n3. Sauke ka kuma shigar da manhaja.\n4. Buɗe manhaja bayan an gama shigarwa.\n\nTabbatar cewa kana sauke manhajar wallet ne kawai daga tushen da aka yarda da shi don guji zamba da manhajojin karya. Duba sunan mai ginin manhaja, ra'ayoyin masu amfani, da kuma yawan sauke-sauke don tabbatar da ingancin.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Screenshot of wallet installation process",
        imageCaptionHausa: "Hoton allo na tsarin shigar da wallet",
      },
      {
        number: 4,
        title: "Creating a New Wallet",
        titleHausa: "Ƙirƙirar Sabon Wallet",
        content:
          "After installing the wallet app, follow these steps to create a new wallet:\n\n1. Open the app and select 'Create a new wallet'.\n2. The app will generate a recovery phrase (also called a seed phrase) consisting of 12-24 random words.\n3. Write down this recovery phrase on paper. Do not store it digitally or take screenshots.\n4. Verify your recovery phrase by entering the words in the correct order when prompted.\n5. Set up a strong password or PIN for daily access to your wallet.\n6. Enable additional security features like biometric authentication if available.\n\nYour recovery phrase is extremely important. If you lose it, you will permanently lose access to your funds. Keep it in a safe, private place, and never share it with anyone.",
        contentHausa:
          "Bayan shigar da manhajar wallet, bi waɗannan matakai don ƙirƙirar sabon wallet:\n\n1. Buɗe manhaja ka zaɓi 'Ƙirƙiri sabon wallet'.\n2. Manhaja za ta samar da jumlar dawo da (wanda ake kira jumlar iri) wanda ya ƙunshi kalmomi 12-24 na bazuwar.\n3. Rubuta wannan jumlar dawo da a kan takarda. Kada ka adana ta a dijital ko ɗauki hoton allo.\n4. Tabbatar da jumlar dawo da ta wurin shigar da kalmomi a cikin tsari mai kyau lokacin da aka tambaye ka.\n5. Saita ƙarfin kalmar sirri ko PIN don shiga wallet ɗinka na kullum.\n6. Kunna ƙarin abubuwan tsaro kamar tantancewar biometric idan akwai.\n\nJumlar dawo da taka tana da mahimmanci sosai. Idan ka rasa ta, za ka rasa damar shiga kuɗinka har abada. Ka ajiye ta a wuri mai tsaro, na sirri, kuma kada ka taɓa raba ta da kowa.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Example of a recovery phrase (never use this example phrase for a real wallet)",
        imageCaptionHausa: "Misalin jumlar dawo da (kada ka taɓa amfani da wannan misalin jumla don wallet na gaske)",
      },
      {
        number: 5,
        title: "Securing Your Wallet",
        titleHausa: "Tsare Wallet Ɗinka",
        content:
          "Security is crucial when dealing with cryptocurrencies. Follow these best practices:\n\n- Keep your recovery phrase offline, written on paper, and stored in a secure location.\n- Consider making multiple copies of your recovery phrase and storing them in different secure locations.\n- Never share your recovery phrase or private keys with anyone.\n- Enable all security features offered by your wallet (PIN, password, biometric authentication).\n- Be cautious of phishing attempts. Only access your wallet through the official app.\n- Keep your device's operating system and wallet app updated.\n- Consider using a hardware wallet for larger amounts of cryptocurrency.\n\nRemember that in cryptocurrency, you are your own bank. There is no 'forgot password' option or customer support that can recover your funds if you lose your recovery phrase.",
        contentHausa:
          "Tsaro yana da mahimmanci sosai lokacin da ake hulɗa da cryptocurrencies. Bi waɗannan shawarwari mafi kyau:\n\n- Ka ajiye jumlar dawo da taka a waje ba tare da haɗi ba, a rubuce a kan takarda, kuma a adana a wuri mai tsaro.\n- Yi la'akari da yin kwafi da yawa na jumlar dawo da taka ka kuma adana su a wurare daban-daban masu tsaro.\n- Kada ka taɓa raba jumlar dawo da ko maɓallan sirri taka da kowa.\n- Kunna duk abubuwan tsaro da wallet ɗinka ke bayarwa (PIN, kalmar sirri, tantancewar biometric).\n- Ka yi hankali da kokarin phishing. Ka shiga wallet ɗinka ta hanyar manhaja ta asali kawai.\n- Ka ci gaba da sabunta tsarin aiki na na'urarka da kuma manhajar wallet.\n- Yi la'akari da amfani da wallet na kayan aiki don adana yawan cryptocurrency mai yawa.\n\nKa tuna cewa a cikin cryptocurrency, kai ne bankinka. Babu zaɓin 'na manta kalmar sirri' ko tallafin abokin ciniki da zai iya dawo da kuɗinka idan ka rasa jumlar dawo da taka.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Security best practices for cryptocurrency wallets",
        imageCaptionHausa: "Shawarwari mafi kyau na tsaro don wallet ɗin cryptocurrency",
      },
      {
        number: 6,
        title: "Receiving Cryptocurrency",
        titleHausa: "Karɓar Cryptocurrency",
        content:
          "To receive cryptocurrency in your wallet:\n\n1. Open your wallet app.\n2. Select the cryptocurrency you want to receive (e.g., Bitcoin).\n3. Tap on 'Receive' or a similar option.\n4. Your wallet will display your public address as both a long string of characters and a QR code.\n5. Share this public address with the sender, or let them scan your QR code.\n\nYour public address is safe to share - it's like your account number. However, for privacy reasons, it's best to use a new address for each transaction when possible. Some wallets generate new addresses automatically.",
        contentHausa:
          "Don karɓar cryptocurrency a cikin wallet ɗinka:\n\n1. Buɗe manhajar wallet ɗinka.\n2. Zaɓi cryptocurrency ɗin da kake son karɓa (misali, Bitcoin).\n3. Danna 'Karɓa' ko wata zaɓi iri ɗaya.\n4. Wallet ɗinka zai nuna adreshin jama'a a matsayin jerin haruffa mai tsawo da kuma lambar QR.\n5. Raba wannan adreshin jama'a da mai aikawa, ko ka bar su su duba lambar QR ɗinka.\n\nAdreshin jama'a naka yana da tsaro don raba - yana kama da lambar asusunka. Duk da haka, saboda dalilan sirri, ya fi kyau a yi amfani da sabon adreshi don kowane ma'amala idan ya yiwu. Wasu wallet suna samar da sababbin adreshi ta atomatik.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Example of a wallet receive screen showing a public address and QR code",
        imageCaptionHausa: "Misalin allon karɓar wallet yana nuna adreshin jama'a da lambar QR",
      },
      {
        number: 7,
        title: "Sending Cryptocurrency",
        titleHausa: "Aika Cryptocurrency",
        content:
          "To send cryptocurrency from your wallet:\n\n1. Open your wallet app.\n2. Select the cryptocurrency you want to send.\n3. Tap on 'Send' or a similar option.\n4. Enter the recipient's public address (or scan their QR code).\n5. Enter the amount you want to send.\n6. Review the transaction details, including the network fee.\n7. Confirm and authorize the transaction with your PIN, password, or biometric authentication.\n\nAlways double-check the recipient's address before sending. Cryptocurrency transactions are irreversible, so if you send to the wrong address, you cannot get your funds back.",
        contentHausa:
          "Don aika cryptocurrency daga wallet ɗinka:\n\n1. Buɗe manhajar wallet ɗinka.\n2. Zaɓi cryptocurrency ɗin da kake son aika.\n3. Danna 'Aika' ko wata zaɓi iri ɗaya.\n4. Shigar da adreshin jama'a na mai karɓa (ko duba lambar QR ɗinsu).\n5. Shigar da adadin da kake son aika.\n6. Sake duba bayanin ma'amala, har da kuɗin hanyar sadarwa.\n7. Tabbatar ka kuma yardar da ma'amala da PIN ɗinka, kalmar sirri, ko tantancewar biometric.\n\nKa tabbatar ka sake duba adreshin mai karɓa kafin aika. Ma'amalolin cryptocurrency ba sa juya, saboda haka idan ka aika ga adreshi mara kyau, ba za ka iya dawo da kuɗinka ba.",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Example of a wallet send screen",
        imageCaptionHausa: "Misalin allon aika wallet",
      },
      {
        number: 8,
        title: "Managing Your Wallet",
        titleHausa: "Gudanar da Wallet Ɗinka",
        content:
          "Tips for effectively managing your cryptocurrency wallet:\n\n1. Regularly check your wallet for updates and install them promptly.\n2. Monitor your transaction history to ensure all transactions are ones you authorized.\n3. Consider using the wallet's backup feature periodically.\n4. If you plan to hold cryptocurrency for a long time without frequent transactions, consider transferring to a hardware wallet.\n5. Learn about the network fees for different cryptocurrencies to optimize your transaction costs.\n6. For areas with limited connectivity, familiarize yourself with your wallet's offline features.\n\nAs you become more comfortable with your wallet, explore its additional features like staking, swapping between different cryptocurrencies, or connecting to decentralized applications (dApps).",
        contentHausa:
          "Shawarwari don gudanar da wallet ɗin cryptocurrency ɗinka cikin inganci:\n\n1. Ka duba wallet ɗinka a kai a kai don sabuntawa ka kuma shigar da su nan da nan.\n2. Lura da tarihin ma'amalolinka don tabbatar duk ma'amalolin sun kasance waɗanda ka yardar.\n3. Yi la'akari da amfani da fasalin adana na wallet a lokaci-lokaci.\n4. Idan kana shirin riƙe cryptocurrency na dogon lokaci ba tare da ma'amaloli na kullum ba, yi la'akari da canja zuwa wallet na kayan aiki.\n5. Koyi game da kuɗin hanyar sadarwa na cryptocurrencies daban-daban don inganta kuɗin ma'amalolinka.\n6. Don wuraren da haɗin yanar gizo ba shi da ƙarfi, saba da fasalin wallet ɗinka na ba tare da haɗi ba.\n\nYayin da kake ƙara jin daɗin wallet ɗinka, bincika ƙarin fasalolin kamar staking, canja tsakanin cryptocurrencies daban-daban, ko haɗa da manhajojin da ba a tsakaita ba (dApps).",
        image: "/placeholder.svg?height=300&width=600",
        imageCaption: "Wallet management dashboard showing transaction history and settings",
        imageCaptionHausa: "Allon gudanar da wallet yana nuna tarihin ma'amala da saitunan",
      },
    ],
    relatedGuides: [
      {
        id: 2,
        title: "Understanding Blockchain Transactions",
        difficulty: "Beginner",
      },
      {
        id: 3,
        title: "Securing Your Digital Assets",
        difficulty: "Intermediate",
      },
    ],
  }

  const handleDownload = () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Cannot download",
        description: "You need to be online to download resources. Please connect to the internet and try again.",
      })
      return
    }

    toast({
      title: "Download started",
      description: `${guide.title} is being downloaded for offline use.`,
    })
  }

  const currentStepData = guide.steps.find((step) => step.number === currentStep) || guide.steps[0]

  const handleNextStep = () => {
    if (currentStep < guide.steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleLanguageChange = (content: string, language: "english" | "hausa") => {
    setLanguage(language)
    toast({
      title: `Language changed to ${language === "english" ? "English" : "Hausa"}`,
      description: `The guide content is now displayed in ${language === "english" ? "English" : "Hausa"}.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" asChild>
              <Link href="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            <LanguageToggle originalContent={guide} targetLanguage="hausa" onLanguageChange={handleLanguageChange} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant={
                        guide.difficulty === "Beginner"
                          ? "default"
                          : guide.difficulty === "Intermediate"
                            ? "accent"
                            : "info"
                      }
                    >
                      {guide.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Languages className="h-3 w-3" />
                      {guide.language}
                    </Badge>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {language === "english" ? guide.title : guide.titleHausa}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">
                    {language === "english" ? guide.description : guide.descriptionHausa}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      By {guide.author} • Last updated: {guide.lastUpdated}
                    </div>

                    <div className="flex gap-2">
                      {guide.downloadable && (
                        <Button variant="outline" size="sm" onClick={handleDownload} disabled={!isOnline}>
                          <Download className="h-4 w-4 mr-1" />
                          Save Offline
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" disabled={!isOnline}>
                        <Bookmark className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" disabled={!isOnline}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold">Progress</h2>
                    <span className="text-sm">
                      Step {currentStep} of {guide.steps.length}
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(currentStep / guide.steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {currentStepData.number}
                    </div>
                    <h2 className="text-2xl font-bold">
                      {language === "english" ? currentStepData.title : currentStepData.titleHausa}
                    </h2>
                  </div>

                  {currentStepData.image && (
                    <figure className="my-6">
                      <img
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={
                          language === "english"
                            ? currentStepData.imageCaption
                            : currentStepData.imageCaptionHausa || ""
                        }
                        className="w-full rounded-lg"
                      />
                      {currentStepData.imageCaption && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-2">
                          {language === "english" ? currentStepData.imageCaption : currentStepData.imageCaptionHausa}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  <div className="prose max-w-none dark:prose-invert">
                    {(language === "english" ? currentStepData.content : currentStepData.contentHausa)
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      ))}
                  </div>

                  <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous Step
                    </Button>
                    {currentStep < guide.steps.length ? (
                      <Button onClick={handleNextStep}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="default" onClick={() => setCurrentStep(1)}>
                        Start Over
                        <ArrowDown className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            </div>

            <div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Guide Steps</h3>
                    <div className="space-y-2">
                      {guide.steps.map((step) => (
                        <button
                          key={step.number}
                          className={`flex items-center w-full p-3 rounded-md text-left transition-colors ${
                            currentStep === step.number
                              ? "bg-primary text-primary-foreground"
                              : step.number < currentStep
                                ? "bg-muted"
                                : "hover:bg-muted"
                          }`}
                          onClick={() => setCurrentStep(step.number)}
                        >
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                              currentStep === step.number
                                ? "bg-primary-foreground text-primary"
                                : step.number < currentStep
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted-foreground text-muted"
                            }`}
                          >
                            {step.number < currentStep ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{step.number}</span>
                            )}
                          </div>
                          <span
                            className={`${step.number < currentStep ? "line-through opacity-70" : ""} truncate text-sm`}
                          >
                            {language === "english" ? step.title : step.titleHausa}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Related Guides</h3>
                    <div className="space-y-4">
                      {guide.relatedGuides.map((relatedGuide) => (
                        <div key={relatedGuide.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <Link
                            href={`/resources/guides/${relatedGuide.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            <h4 className="font-medium mb-1">{relatedGuide.title}</h4>
                          </Link>
                          <Badge
                            variant={
                              relatedGuide.difficulty === "Beginner"
                                ? "default"
                                : relatedGuide.difficulty === "Intermediate"
                                  ? "accent"
                                  : "info"
                            }
                          >
                            {relatedGuide.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      If you're having trouble following this guide or have questions, you can:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Join our community forum to ask questions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Attend our weekly virtual meetups for beginners</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span>Contact our support team via the Help page</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4" asChild>
                      <Link href="/community">Join Community</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

