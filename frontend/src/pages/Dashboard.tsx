
import { Navbar } from "@/components/Navbar";
import { InvoiceForm } from "@/components/InvoiceForm";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-12 px-4 max-w-5xl">
        <div className="space-y-4 mb-10 animate-in fade-in">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI-Powered Analysis
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-red-500 text-transparent bg-gradient-to-r from-foreground to-foreground/80 pb-2">Red Flag</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Upload invoices or enter details to verify authenticity with advanced AI technology
          </p>
        </div>
        
        <div className="rounded-xl overflow-hidden border shadow-lg backdrop-blur-sm bg-card/50 transition-all hover:shadow-xl animate-in fade-in delay-100">
          <InvoiceForm />
        </div>
      </main>
      <footer className="border-t py-6 bg-muted/30 backdrop-blur-sm">
        <div className="container flex justify-center items-center text-sm text-muted-foreground">
          <p>© 2025 Red Flag. Catching Frauds Before They Cost You.</p>
          {/* <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
