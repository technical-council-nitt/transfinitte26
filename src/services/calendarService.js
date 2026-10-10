const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID || "";
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || "";

/**
 * Fetches events directly from Google Calendar API.
 * No hardcoded notifications.
 */
export async function fetchCalendarNotifications() {
  if (!CALENDAR_ID || !API_KEY) {
    return [];
  }

  try {
    const encodedCalendarId = encodeURIComponent(CALENDAR_ID);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodedCalendarId}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&maxResults=20`;

    const response = await fetch(url);
    if (!response.ok) {
      console.warn("Google Calendar API returned status:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Map Google Calendar events directly
    const calendarNotifications = data.items.map((event) => ({
      id: event.id,
      title: event.summary || "TransfiNITTe Announcement",
      message: event.description || "",
      createdAt: event.created
        ? new Date(event.created).getTime()
        : event.updated
        ? new Date(event.updated).getTime()
        : Date.now(),
      location: event.location || "",
    }));

    // Sort descending by createdAt (newest first)
    return calendarNotifications.sort((a, b) => b.createdAt - a.createdAt);
  } catch (err) {
    console.error("Error loading Google Calendar notifications:", err);
    return [];
  }
}
