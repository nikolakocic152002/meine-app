import { useState } from "react";
import { Map, ExternalLink, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MapTokenInputProps {
  onTokenSubmit: (token: string) => void;
  savedToken?: string;
}

const MapTokenInput = ({ onTokenSubmit, savedToken }: MapTokenInputProps) => {
  const [token, setToken] = useState(savedToken || "");
  const [isSubmitted, setIsSubmitted] = useState(!!savedToken);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
      setIsSubmitted(true);
      // Save to localStorage for persistence
      localStorage.setItem("mapbox_token", token.trim());
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setToken("");
    localStorage.removeItem("mapbox_token");
    onTokenSubmit("");
  };

  if (isSubmitted && token) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
        <Check className="h-5 w-5 text-success flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Mapbox verbunden</p>
          <p className="text-xs text-muted-foreground truncate">
            Token: {token.substring(0, 20)}...
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Ändern
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Map className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Mapbox-Karte aktivieren</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Für die interaktive Karte benötigst du einen kostenlosen Mapbox Token.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="pk.eyJ1IjoieW91ci10b2tlbiIsImEiOiJjbG..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="font-mono text-sm"
        />
        
        <div className="flex items-center justify-between gap-3">
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Token erstellen
          </a>
          
          <Button type="submit" disabled={!token.trim()}>
            Verbinden
          </Button>
        </div>
      </form>

      <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
        <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Der Token wird lokal gespeichert. Für Produktionseinsatz sollte er über 
          Lovable Cloud verwaltet werden.
        </p>
      </div>
    </div>
  );
};

export default MapTokenInput;
