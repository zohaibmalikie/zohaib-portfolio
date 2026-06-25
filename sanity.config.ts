"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, previewOrigin, projectId } from "@/sanity/env";
import { resolve } from "@/sanity/presentation/resolve";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "default",
  title: "Zohaib Portfolio CMS",
  basePath: "/studio",
  projectId: projectId || "demo",
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable"
        }
      }
    }),
    visionTool({ defaultApiVersion: apiVersion })
  ],
  schema: {
    types: schemaTypes
  }
});
