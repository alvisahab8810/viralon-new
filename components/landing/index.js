// Registry of SEO landing-page templates. Keys must match TEMPLATE_KEYS in
// viralon-payroll/utils/landingTemplates.js — the admin picks one of these.
import Curve from "./templates/Curve";
import Nexa from "./templates/Nexa";
import Studio from "./templates/Studio";
import Boom from "./templates/Boom";
import Bold from "./templates/Bold";
import Service from "./templates/Service";

export const LANDING_TEMPLATES = {
  curve: Curve,
  nexa: Nexa,
  studio: Studio,
  boom: Boom,
  bold: Bold,
  // House skin — reuses the live our-services markup, classes and icons.
  service: Service,
};

export const getLandingTemplate = (key) => LANDING_TEMPLATES[key] || Curve;
