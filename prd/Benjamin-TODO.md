# Development Todos

## General Ideas

- [x] Develop the about and contact pages
- [] Explain what each file is doing in the project. Give 2 sentences each
- [] Improve README.md file

## About page

## Contact page [x]

## footer [x]


Generated mobile-home.jpg screenshot
src/components/base/AppForm.vue:26:8 - error TS2345: Argument of type '{ variant: "secondary"; type: "button"; disabled: boolean; onClick: any; }' is not assignable to parameter of type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'.
  Property 'loading' is missing in type '{ variant: "secondary"; type: "button"; disabled: boolean; onClick: any; }' but required in type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'.

26       <AppButton
          ~~~~~~~~~

  src/components/base/AppButton.vue:62:3
    62   loading: boolean  // Changed from optional to required with default
         ~~~~~~~
    'loading' is declared here.

src/components/base/AppForm.vue:38:10 - error TS2322: Type '"button" | "submit" | undefined' is not assignable to type '"button" | "reset" | "submit"'.
  Type 'undefined' is not assignable to type '"button" | "reset" | "submit"'.

38         :type="submitButtonType"
            ~~~~

  src/components/base/AppButton.vue:60:3
    60   type: 'button' | 'submit' | 'reset'
         ~~~~
    The expected type comes from property 'type' which is declared here on type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'

src/components/base/AppInput.vue:26:8 - error TS2379: Argument of type '{ class: (string | { 'pl-10': string | Slot<any> | undefined; 'pr-10': string | boolean | Slot<any>; 'bg-gray-50': boolean | undefined; 'cursor-not-allowed': boolean | undefined; 'border-red-300 focus:border-red-500 focus:ring-red-500': string | undefined; })[]; ... 8 more ...; onInput: (event: Event) => void; }' is not assignable to parameter of type 'InputHTMLAttributes & ReservedProps & Record<string, unknown>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ class: (string | { 'pl-10': string | Slot<any> | undefined; 'pr-10': string | boolean | Slot<any>; 'bg-gray-50': boolean | undefined; 'cursor-not-allowed': boolean | undefined; 'border-red-300 focus:border-red-500 focus:ring-red-500': string | undefined; })[]; ... 8 more ...; onInput: (event: Event) => void; }' is not assignable to type 'InputHTMLAttributes' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property 'disabled' are incompatible.
      Type 'boolean | undefined' is not assignable to type 'Booleanish'.
        Type 'undefined' is not assignable to type 'Booleanish'.

26       <input
          ~~~~~

src/components/base/ErrorBoundary.vue:19:14 - error TS2345: Argument of type '{ variant: "primary"; loading: boolean; onClick: any; }' is not assignable to parameter of type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'.
  Type '{ variant: "primary"; loading: boolean; onClick: any; }' is missing the following properties from type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...': type, disabled

19             <app-button variant="primary" @click="retry" :loading="isRetrying">
                ~~~~~~~~~~

src/components/base/ErrorBoundary.vue:22:14 - error TS2345: Argument of type '{ variant: "secondary"; onClick: any; }' is not assignable to parameter of type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'.
  Type '{ variant: "secondary"; onClick: any; }' is missing the following properties from type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...': type, loading, disabled

22             <app-button variant="secondary" @click="workOffline">
                ~~~~~~~~~~

src/components/base/ErrorBoundary.vue:40:14 - error TS2345: Argument of type '{ variant: "primary"; loading: boolean; onClick: any; }' is not assignable to parameter of type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...'.
  Type '{ variant: "primary"; loading: boolean; onClick: any; }' is missing the following properties from type '{ readonly variant?: "primary" | "secondary" | "outline" | "danger" | "success"; readonly size?: "sm" | "md" | "lg"; readonly type: "button" | "reset" | "submit"; readonly text?: string; readonly loading: boolean; readonly disabled: boolean; readonly onClick?: ((event: MouseEvent) => void) & ((event: MouseEvent) => ...': type, disabled

40             <app-button variant="primary" @click="retry" :loading="isRetrying">
                ~~~~~~~~~~

src/components/base/LoadingSpinner.vue:2:4 - error TS2379: Argument of type '{ role: string; 'aria-label': string | undefined; class: ("sm" | "md" | "lg" | { 'with-label': string | undefined; } | undefined)[]; }' is not assignable to parameter of type 'HTMLAttributes & ReservedProps & Record<string, unknown>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ role: string; 'aria-label': string | undefined; class: ("sm" | "md" | "lg" | { 'with-label': string | undefined; } | undefined)[]; }' is not assignable to type 'HTMLAttributes' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property ''aria-label'' are incompatible.
      Type 'string | undefined' is not assignable to type 'string'.
        Type 'undefined' is not assignable to type 'string'.

2   <div
     ~~~

src/components/base/LoadingSpinner.vue:58:7 - error TS6133: 'props' is declared but its value is never read.

58 const props = withDefaults(defineProps<Props>(), {
         ~~~~~

src/components/base/LoadingSpinner.vue:58:50 - error TS2379: Argument of type '{ size: "md"; label: undefined; hideLabel: false; ariaLabel: string; showNetworkSpeed: false; }' is not assignable to parameter of type 'InferDefaults<LooseRequired<Props>>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'label' are incompatible.
    Type 'undefined' is not assignable to type 'InferDefault<LooseRequired<Props>, string | undefined>'.

 58 const props = withDefaults(defineProps<Props>(), {
                                                     ~
 59   size: 'md',
    ~~~~~~~~~~~~~
... 
 63   showNetworkSpeed: false
    ~~~~~~~~~~~~~~~~~~~~~~~~~
 64 })
    ~

src/components/NetworkAwareImage.vue:54:50 - error TS2379: Argument of type '{ width: undefined; height: undefined; lowQualityWidth: number; fullSizeKB: undefined; }' is not assignable to parameter of type 'InferDefaults<LooseRequired<Props>>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'width' are incompatible.
    Type 'undefined' is not assignable to type 'InferDefault<LooseRequired<Props>, number | undefined>'.

 54 const props = withDefaults(defineProps<Props>(), {
                                                     ~
 55   width: undefined,
    ~~~~~~~~~~~~~~~~~~~
... 
 58   fullSizeKB: undefined
    ~~~~~~~~~~~~~~~~~~~~~~~
 59 })
    ~

src/components/OptimizedLoading.vue:51:8 - error TS2379: Argument of type '{ disabled: boolean | undefined; class: string; onClick: (payload: MouseEvent) => void; }' is not assignable to parameter of type 'ButtonHTMLAttributes & ReservedProps & Record<string, unknown>' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ disabled: boolean | undefined; class: string; onClick: (payload: MouseEvent) => void; }' is not assignable to type 'ButtonHTMLAttributes' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property 'disabled' are incompatible.
      Type 'boolean | undefined' is not assignable to type 'Booleanish'.
        Type 'undefined' is not assignable to type 'Booleanish'.

51       <button
          ~~~~~~

src/composables/useNetworkStatus.ts:66:7 - error TS2375: Type '{ isOnline: boolean; connectionType: any; effectiveType: any; downlink: any; rtt: any; saveData: any; isMetered: any; connectionQuality: "excellent" | "good" | "fair" | "poor"; lastOnlineTime: number | undefined; reconnectionAttempts: number; }' is not assignable to type 'NetworkInfo | { isOnline: boolean; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; lastOnlineTime?: number; reconnectionAttempts: number; connectionQuality: "excellent" | ... 2 more ... | "poor"; isMetered?: boolean; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ isOnline: boolean; connectionType: any; effectiveType: any; downlink: any; rtt: any; saveData: any; isMetered: any; connectionQuality: "excellent" | "good" | "fair" | "poor"; lastOnlineTime: number | undefined; reconnectionAttempts: number; }' is not assignable to type '{ isOnline: boolean; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; lastOnlineTime?: number; reconnectionAttempts: number; connectionQuality: "excellent" | ... 2 more ... | "poor"; isMetered?: boolean; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property 'lastOnlineTime' are incompatible.
      Type 'number | undefined' is not assignable to type 'number'.
        Type 'undefined' is not assignable to type 'number'.

66       networkInfo.value = {
         ~~~~~~~~~~~~~~~~~

src/composables/useNetworkStatus.ts:80:7 - error TS2375: Type '{ isOnline: boolean; lastOnlineTime: number | undefined; reconnectionAttempts: number; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; connectionQuality: "excellent" | "good" | "fair" | "poor"; isMetered?: boolean; }' is not assignable to type 'NetworkInfo | { isOnline: boolean; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; lastOnlineTime?: number; reconnectionAttempts: number; connectionQuality: "excellent" | ... 2 more ... | "poor"; isMetered?: boolean; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Type '{ isOnline: boolean; lastOnlineTime: number | undefined; reconnectionAttempts: number; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; connectionQuality: "excellent" | "good" | "fair" | "poor"; isMetered?: boolean; }' is not assignable to type '{ isOnline: boolean; connectionType: string; effectiveType: string; downlink: number; rtt: number; saveData: boolean; lastOnlineTime?: number; reconnectionAttempts: number; connectionQuality: "excellent" | ... 2 more ... | "poor"; isMetered?: boolean; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property 'lastOnlineTime' are incompatible.
      Type 'number | undefined' is not assignable to type 'number'.
        Type 'undefined' is not assignable to type 'number'.

80       networkInfo.value = {
         ~~~~~~~~~~~~~~~~~


Found 13 errors.