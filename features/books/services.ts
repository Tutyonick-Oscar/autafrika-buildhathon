import "server-only";
import { connection } from "next/server";
import { apiClient } from "@/lib/axios";

// Endpoints live inside their feature: each team owns its own
// without Git conflicts on a shared file.

