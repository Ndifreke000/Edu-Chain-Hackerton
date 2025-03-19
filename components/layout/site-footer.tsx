import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Github, Twitter, Facebook, Instagram, ExternalLink } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">BlockLearn</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Blockchain education platform designed for Northern Nigeria, providing accessible learning resources both
              online and offline.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                  >
                    Documentation
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/resources/articles/1"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/guides/1"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                    Use Cases
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 BlockLearn. All rights reserved. Last updated: March 17, 2025
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

