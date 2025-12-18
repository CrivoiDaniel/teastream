
export interface LocationInfo {
    country: string
    city: string
    latitude: number
    longitude: number
}

export interface DeviceInfo {
    browser: string
    os: string // operation system
    type: string // mobile/desktop
}

export interface SessionMetadata {
    location: LocationInfo
    device: DeviceInfo
    ip: string   //ip adress
}