package net.guglio.directcall

import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ResolveInfo
import android.net.Uri
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class ExpoDirectCallModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoDirectCall")

        Function("directCall") { phoneNumber: String ->
            val url =  if (Build.VERSION.SDK_INT > Build.VERSION_CODES.TIRAMISU) {
                "tel:(${Uri.encode(phoneNumber)})"
            } else {
                "tel:${Uri.encode(phoneNumber)}"
            }
            val callIntent = Intent(Intent.ACTION_CALL, Uri.parse(url))
            callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

            getDialerPackage(callIntent)?.let {
                callIntent.setPackage(it)
            }

            val activity = appContext.activityProvider?.currentActivity
            activity?.startActivity(callIntent)
        }

        Function("debug") {
            val callIntent = Intent(Intent.ACTION_CALL, Uri.parse("tel:123456789"))
            callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

            val systemApps = getAppsFor(callIntent, true)
            val allDialerApps = getAppsFor(callIntent, false)

            val appThatWillBeUsed = getDialerPackage(callIntent)

            return@Function """               
                System dialer apps: ${systemApps.joinToString<ResolveInfo>(", ") { getPackageName(it) ?: "null" }}
                
                All dialer apps: ${allDialerApps.joinToString<ResolveInfo>(", ") { getPackageName(it) ?: "null" }}
                
                App chosen: $appThatWillBeUsed
            """.trimIndent()
        }
    }

    private fun getPackageName(resolveInfo: ResolveInfo): String? {
        return resolveInfo.activityInfo?.packageName
    }

    private fun getAppsFor(intent: Intent, systemOnly: Boolean): List<ResolveInfo> {
        val packageManager = appContext.reactContext?.packageManager ?: return emptyList()

        val filterFlag = if (systemOnly) {
            PackageManager.MATCH_SYSTEM_ONLY
        } else {
            PackageManager.MATCH_ALL
        }

        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            packageManager.queryIntentActivities(
                    intent,
                    PackageManager.ResolveInfoFlags.of(filterFlag.toLong())
            )
        } else {
            packageManager.queryIntentActivities(
                    intent,
                    filterFlag
            )
        }
    }

    private fun getDialerPackage(callIntent: Intent): String? {
        val systemDialerApps = getAppsFor(callIntent, true)

        if (systemDialerApps.isNotEmpty()) {
            return getPackageName(systemDialerApps.first())
        }

        val allDialerApps = getAppsFor(callIntent, false)
        return allDialerApps.firstOrNull()?.let {
            getPackageName(it)
        }
    }
}