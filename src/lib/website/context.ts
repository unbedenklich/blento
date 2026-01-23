import type { Did, Handle } from '@atcute/lexicons';
import { createContext } from 'svelte';

export const [getDidContext, setDidContext] = createContext<Did>();
export const [getHandleContext, setHandleContext] = createContext<Handle>();
export const [getIsMobile, setIsMobile] = createContext<() => boolean>();
export const [getCanEdit, setCanEdit] = createContext<() => boolean>();
export const [getAdditionalUserData, setAdditionalUserData] =
	createContext<Record<string, unknown>>();
