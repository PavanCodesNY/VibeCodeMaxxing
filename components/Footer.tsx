export function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground">
            © 2025 Alex Johnson. All rights reserved.
          </div>
          <div className="text-muted-foreground text-sm">
            Designed and built with care
          </div>
        </div>
      </div>
    </footer>
  );
}