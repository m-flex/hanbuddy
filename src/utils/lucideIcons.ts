import {
  Hand,
  Hash,
  Utensils,
  Map,
  MapPin,
  Sun,
  Users,
  BookOpen,
  LayoutGrid,
  Settings,
  MessageCircle,
  Calculator,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Hand,
  Hash,
  Utensils,
  Map,
  MapPin,
  Sun,
  Users,
  BookOpen,
  LayoutGrid,
  Settings,
  MessageCircle,
  Calculator,
};

/**
 * Returns the Lucide icon component for the given name.
 * Falls back to BookOpen if name is undefined or not found in the map.
 */
export function getIcon(name: string | undefined): LucideIcon {
  if (name && iconMap[name]) {
    return iconMap[name];
  }
  return BookOpen;
}
